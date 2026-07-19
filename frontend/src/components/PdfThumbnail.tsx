import React, { useEffect, useRef, useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';

interface PdfThumbnailProps {
  src: string;
  title: string;
}

// Reusable script loader helper for lazy loading PDF.js only when needed
const loadPdfJs = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ((window as any)['pdfjsLib']) {
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[src*="pdf.min.js"]');
    if (existingScript) {
      const handleLoad = () => resolve();
      const handleError = (e: any) => reject(e);
      existingScript.addEventListener('load', handleLoad);
      existingScript.addEventListener('error', handleError);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
};

export const PdfThumbnail: React.FC<PdfThumbnailProps> = ({ src, title }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Intersection Observer to detect when the thumbnail enters the viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(container);
        }
      },
      { rootMargin: '150px' } // Pre-load slightly before it enters the viewport
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Render PDF once visible and PDF.js is dynamically loaded
  useEffect(() => {
    if (!isVisible) return;
    
    let active = true;
    const renderPDF = async () => {
      try {
        setError(false);
        setLoading(true);
        
        // Dynamically load PDF.js library to optimize initial bundle size & load times
        await loadPdfJs();
        if (!active) return;

        const currentPdfjsLib = (window as any)['pdfjsLib'];
        if (!currentPdfjsLib) {
          throw new Error('PDF.js not loaded');
        }

        currentPdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

        const loadingTask = currentPdfjsLib.getDocument(src);
        const pdf = await loadingTask.promise;
        if (!active) return;

        const page = await pdf.getPage(1);
        if (!active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Render at 2x resolution for retina/high-quality output (non-blurry)
        const viewport = page.getViewport({ scale: 2.0 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        if (active) {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error rendering PDF thumbnail:', err);
        if (active) {
          setError(true);
          setLoading(false);
        }
      }
    };

    renderPDF();

    return () => {
      active = false;
    };
  }, [src, isVisible]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-1.5 p-3 text-red-400 select-none w-full h-full">
        <FileText size={32} className="text-red-500 shrink-0" />
        <span className="font-mono text-[9px] uppercase tracking-wide truncate max-w-[200px]" title={src.split('/').pop()}>
          {src.split('/').pop()}
        </span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-10">
          <Loader2 className="animate-spin text-cyan-400" size={24} />
        </div>
      )}
      {isVisible && (
        <canvas
          ref={canvasRef}
          title={title}
          aria-label={`PDF preview of ${title}`}
          className="w-full h-full object-cover"
          style={{ imageRendering: 'auto' }}
        />
      )}
    </div>
  );
};

export default PdfThumbnail;
