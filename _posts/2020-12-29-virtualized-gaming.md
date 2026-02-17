---
title: 'Virtualized Household Gaming'
date: 2020-12-29
permalink: /posts/2021/01/virtualized-gaming/
tags:
  - technology
---

We are a household of gamers. Alicia and I date back to the Nintendo days and now we have offspring who love games like Minecraft and Roblox. When we come together in the living room to game together, we play titles like Overcooked and platformers like Rayman. We're more of a PC gaming family than a console family... so this has resulted in a couple of Home Theatre PCs (HTPCs) with gaming capabilities being deployed to our two largest televisions. So when you add these two to the gaming PCs on my desk and in each of the kids' rooms... we're up to five in the house. What's wrong with that?

Well... it presents a bit of sustainability issue. Keeping five PCs relatively current is a costly venture... especially given the cost of graphics cards. What if we could reduce that hardware burden through virtualization?

<div markdown="1" style="text-align:center">
![](/images/virtualized-gaming-sm.PNG)
</div>

No no, this has nothing to do with virtual reality. This is about using my [Unraid server](https://unraid.net/) to host a virtual machine (VM) running Windows 10 that has a dedicated graphics card available to it for the purposes of gaming. Then, you only need a relatively modest PC connected to your TV to connect to that VM to play your games. There are a variety of benefits associated with this:

1. Cost savings. Fewer graphics cards required, fewer PC upgrades required.
2. Those HTPCs are able to be smaller, less powerful, and quieter now that they don't need graphics cards. Integrated graphics will be fine.
3. Scalable performance. Depending on what hardware you have in your Unraid server, you may be able to virtually scale performance over time.
4. Centralized storage of your game library for multiple clients. Install once, play everywhere.
5. If you want, you can use this to connect to your games while away from home, over the internet.

The benefits are many, but you need to have some serious hardware available to get started. The reason I'm so excited about this is that because of investments I've made over the last 12-18 months, a CPU upgrade is all that is required to pull this off. I scooped up an [AMD Ryzen 7 2700 off AliExpress](https://www.aliexpress.com/item/4000055431167.html?spm=a2g0s.9042311.0.0.64d84c4dUoNYy8) and this gives me 8 CPU cores and 16 CPU threads. I'll be able to dedicate 4 cores and 8 threads to a gaming VM leaving me 4 cores and 8 threads for the other tasks I ask my Unraid server to do. More than enough.

I'm certainly not going to turn this into a tutorial... as many nerds have come before me on this particular topic. I will include a few helpful links below:

* Windows 10 Virtualization on [Unraid](https://unraid.net/) care of [Spaceinvaderone](https://www.youtube.com/channel/UCZDfnUn74N0WeAPvMqTOrtA). [Part 1](https://youtu.be/miYUGWq6l24) covers the basics. [Part 2](https://youtu.be/A2dkrFKPOyw) gets in to passing your gaming hardware through to the virtual machine.
* [Windows 10 Virtualization on Proxmox](https://youtu.be/fgx3NMk6F54) for those not interested in using Unraid. Care of Techno Tim.
* Parsec is the software I'm using to connect to my Gaming VM from my HTPCs. It's fantastic. Watch [getting started with parsec](https://youtu.be/mXj08nTzOaE).
* I prefer Windows 10 machines for my HTPCs, but if you are down with Raspberry Pi, [here is a tutorial on how to get Parsec running on a Raspberry Pi 3](https://youtu.be/sjO95WmyCc0) care of ETA Prime.

Enjoy your virtual(ized) gaming!

:vulcan_salute: