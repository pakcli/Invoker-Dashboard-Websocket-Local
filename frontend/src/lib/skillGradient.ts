export const SKILL_COLORS: Record<string, string> = {
  q: '#00d0ff', // Quas Blue
  w: '#d000ff', // Wex Purple
  e: '#ff6a00', // Exort Orange
};

export function getSkillGradient(skill: string | undefined, isLightMode = false): string {
  if (!skill || skill.length !== 3) {
    return isLightMode ? '#cbd5e1' : '#334155'; // Tailwind slate-300 / slate-700
  }

  const chars = skill.toLowerCase().split('');
  const c1 = SKILL_COLORS[chars[0]] || '#475569';
  const c2 = SKILL_COLORS[chars[1]] || '#475569';
  const c3 = SKILL_COLORS[chars[2]] || '#475569';

  return `linear-gradient(90deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
}
