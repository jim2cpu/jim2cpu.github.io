---
title: 'The Evolution of my Homelab'
date: 2020-08-21
permalink: /posts/2020/08/homelab-evolution/
tags:
  - technology
---

One of my [positives from the pandemic](https://jimkirk.org/blog/positives-from-covid-19) has been having extra time to reconnect with my "hands-on" technology roots. This reconnection was jump-started by a technical issue. With the whole family working and learning from home, my network was under serious stress and we were regularly being disconnected from our Microsoft Teams or Google Meet calls. I had a router issue that forced me to roll up my sleeves and exercise my troubleshooting skills. That got the juices flowing and boy did things spiral from there.

Here is a bulleted list of _some_ of the events and actions that followed:
* Called my Internet Service Provider (ISP) to upgrade my internet to Gigabit knowing it necessitated a new router.
* New router and internet upgrade solved our video call disconnection issues... but had technical limitations I couldn't live with.
* Started researching router/firewall appliances and router/firewall operating systems for a possible custom build.
* Synology NAS needed a capacity upgrade... discovered [Unraid](https://unraid.net/) and built a new NAS / Virtualization Platform.
* Made the decision to self-host [jimkirk.org](https://jimkirk.org) again after years of hosting it in Google Sites.
* Opted to "roll my own" Router/Firewall, replacing the ISP-supplied shit router.
* Had some structured wiring work done to extend ethernet to the kids rooms on the top floor of the house.

<div markdown="1" style="text-align:center">
![](/images/on-and-on-380w.jpg)
</div>

Alright... alright... There is so much more but I will transition.

My personality is such that I can't just half-ass something. If I have the time, I'm not just going to try to do it right. I'm going to shoot for perfection. As I was going through all this work, I realized that I was actually building out a [Homelab](https://www.reddit.com/r/homelab/). This had me reflect back on past labs in past homes and I thought it would be neat to search my pictures to walk down memory lane.

**The Townhouse (2000 - 2003)**

This was a rental unit in North Bay, Ontario where I moved for my first job in the industry back in 2000. This was a very geeky time in my life and this 2 bedroom townhouse let me spread my geek wings and fly. I was reviewing hardware back then for 2CPU.com and doing a lot of Linux/BSD admin work as a side hustle.

<div markdown="1" style="text-align:center">
![](/images/the-office-northbay.jpg)
</div>

What a beauty... look at those folding tables. Test bench to the left, battlestation to the right. I was too young and dumb to care about cable management back then.

<div markdown="1" style="text-align:center">
![](/images/server-storagecloset-northbay.jpg)
</div>

This little storage closet was a dream. It was right there in the 2nd bedroom and even offered cooling because it was below ground. I was self-hosting my website back then. That machine was either running Linux, FreeBSD or OpenBSD. :slightly_smiling_face:

**The Bungalow (2005 - 2008)**

This was the first home we owned, a perfect starter Bungalow in Fonthill, Ontario. It had a great finished basement and a large mechanical room that I also used as a Lab. I was in a very technical role at that time, so in addition to my side hustle work, I was also playing with enterprise tools like Active Directory and SQL Server.

<div markdown="1" style="text-align:center">
![](/images/the-jerker-fonthill.jpg)
</div>

The [Ikea Jerker desk was legendary](https://www.marketing-mojo.com/blog/ikeas-crime-against-humanity-an-ode-to-the-jerker/)... I had two, one configured for sitting as my desk and another configured as a standing bench. I was still self-hosting at this time, on a Dell PowerEdge I purchased new for a song. I eventually repurposed the PowerEdge as a dev environment and [hosted my website on an original Xbox](https://en.wikipedia.org/wiki/Xbox_Linux). Amazing.

**The Dream Home (2008 - 2011)**

This was the first house we built together just as we were starting our family. It was a large, brick Executive-style home in Fonthill, Ontario. I did have the house properly wired with coaxial and ethernet with everything running to a predefined area in the mechanical room in the basement. The Jerker came along for the ride!

At this point, I'd already been tricked into management (that's a story I should tell at some point!) and then senior management. With my job being non-technical (but busier) and with two babies arriving 13 months apart, I had no time, energy or money to build and maintain a lab. This was also the start of my Apple :apple: phase. My focus in this house was cord cutting. I mounted antenna's in the attic and converted an old [HP Mediavault NAS](https://en.wikipedia.org/wiki/HP_Media_Vault) into a Mac server running [SageTV](http://www.sagetv.com/).

<div markdown="1" style="text-align:center">
![](/images/hackintosh-server-fonthill2.JPG)
</div>

I really loved this machine. The NAS case was tiny and I replaced the motherboard and CPU with an embedded Intel Atom solution. Ran Mac OS like a dream and consumed very little power.

<div markdown="1" style="text-align:center">
![](/images/antenna-attic-fonthill2.JPG)
</div>

I burned a lot of time and money on antenna gear. I had two of these in the attic and one was on a rotator so I could turn it towards Erie, PA and pick up Pittsburgh Steelers games. What a setup.

**The Nova Scotia Homestead (2011 - Present)**

When we made our way back to Nova Scotia, we bought a [traditional "Salt Box" style home](https://en.wikipedia.org/wiki/Saltbox_house) that was only 3-4 years old at the time. It was only wired for coaxial but when we renovated, I had the basement and main floors wired with ethernet. Once again I targeted the mechanical room in the basement to house the core of my network infrastructure. As I've aged, I have become much more patient and meticulous about my stuff. You give me some time and a bag of zip ties... and I'm a happy man.

While I'm not at the level (yet) of having an actual rack in my house, I decided to keep everything up and wall mounted where possible.

<div markdown="1" style="text-align:center">
![](/images/homelab-2020-cranleyrd.jpg)
</div>

I'm really happy with the work I've done on this lab. I have low power and easy-to-expand storage and virtualization infrastructure, a robust firewall, enterprise-class Wi-Fi, significant runtimes in the event of power loss, and _adequate_ switching gear. I'm not done, though. I don't think geeks are ever done.

**UPDATE**: Told you I couldn't leave it alone. Switching gear upgraded. Ubiquiti ER-X redeployed as a backup router.

<div markdown="1" style="text-align:center">
![](/images/homelab-sept-2020-cranleyrd.jpg)
</div>

:vulcan_salute: