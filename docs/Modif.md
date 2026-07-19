
1. count how many combination are there in a toggle exppandable accordian default off > all ten orb combinarion
   qqq
   qqw
   dst smpai qwe
   
   
2. make sure for the orb bisualsation make sure usethe dominan one first of there is none maka pakai the blue first
3. on editin and new instance > make it there is tell the target intenace / parent meaning  "include this as depeencies"
   also this operation is cancel able so it will save if it trigger save or make new
4. 
![[Pasted image 20260705155715.png]]
![[Pasted image 20260705155557.png]]
update fix tableview


```mermaid
graph TD
    subgraph Host Machine (Windows)
        Flask["Flask Server (0.0.0.0:5000)"] --> Data["Local Markdown Files"]
        Cert["SAN Certificate (localhost + Local IP)"] -.-> Flask
        FW["Windows Defender Firewall (Open Port 5000)"] --> Flask
    end
    subgraph Other Devices (Wi-Fi)
        Phone["Mobile Browser"] -- "https://192.168.x.x:5000" --> FW
        Laptop["Other Laptop"] -- "https://192.168.x.x:5000" --> FW
    end

```