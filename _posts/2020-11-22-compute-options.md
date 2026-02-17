---
title: 'Self-Hosting Compute Options'
date: 2020-11-22
permalink: /posts/2020/11/compute-options/
tags:
  - technology
---

I'm going to nerd out a bit in this post. If that's not your jam, leave now or forever hold your peace.

As I said [in an earlier post](https://jimkirk.org/blog/positives-from-covid-19), the pandemic has created conditions that have allowed me to scratch an old technology itch while also doing some hands-on learning on newer technologies that weren't available prior to my transition to management. It's been a ton of fun building out some infrastructure here at the house and bringing several internal and external services to life.

My preferences in hardware have definitely changed as I've aged, though. I'm especially keen on a couple of criteria:

1. I favor smaller form factors. I don't want the honking huge full tower case or 4U chassis anymore.
2. I favor lower power consumption electronics. I care about the environment and my electric bill.

So with this in mind, I'd like to highlight 3 different devices I recently purchased and deployed for different use cases on my home network. They are:

1. A Dell Optiplex Small Form Factor (SFF) PC for use as a custom firewall and router.
2. An HP Thin Client PC for use as a web server.
3. A Raspberry Pi Zero for use as a DNS / ad blocking server.

**1. Dell Optiplex SFF PC**

There are a lot of reasons to like SFF Dell Optiplexes. They are always in great supply on the refurbished and used markets, they are inexpensive, small, stackable, and can be purchased with low-end or high-end CPUs (i3 -> i5 -> i7) depending on your use case. I have two running in the house right now. A 3020 with a 4th generation Core i3 CPU acts as my router and firewall. An older 390 with a 2nd generation i5 CPU is a low-end Home Theatre PC with a dedicated graphics card installed for gaming.

Power consumption on these units will be dependent on the CPU you've selected, its vintage/generation, and the operating system you're running. I've seen my 3020 dip as low as 19W.

<div markdown="1" style="text-align:center">
![Optiplex 3020](/images/optiplex-3020.jpg)
</div>

**2. Thin Clients**

When I decided to self-host this blog again, I didn't want to forward traffic from the internet right onto my LAN. For security reasons, I decided to establish a [DMZ](https://en.wikipedia.org/wiki/DMZ_(computing)) that would host dedicated infrastructure to host my external services. It would have no access to my LAN and devices on my LAN would have no access to it. Knowing that I didn't need a lot of horsepower to host a few web apps, I decided to look at really cheap and low power options. I initially looked at a Raspberry Pi 4, but when you factor in the cost of all the accessories, it adds up quick. Thanks to [reddit](https://www.reddit.com/r/selfhosted/), I stumbled on the idea of using a thin client. They are widely available on eBay and I snagged an [HP T520](https://www8.hp.com/ca/en/thin-clients/t520.html) for ~70CDN taxes in and shipped.

<div markdown="1" style="text-align:center">
![HP T520](/images/hp-t520.jpg)
</div>

This tiny computer idles at about 6W of electricity and since it's an x86 processor... there are zero compatibility issues to contend with.

If you are interested in this option, I strongly recommend you bookmark [this site managed by David Parkinson](https://www.parkytowers.me.uk/thin/). It's the definitive resource on the use of thin clients in this way.

**3. Raspberry Pi**

I've owned several Raspberry Pis over the years... but they never seemed to "stick". I'd tinker with them for awhile and then throw them in a static bag until I eventually sold them on the used market. This was before I decided to get back into self-hosting, though... and I finally found the perfect use case for me... as my [primary DNS server](https://en.wikipedia.org/wiki/Domain_Name_System). I started using [Pi-hole](https://pi-hole.net/) earlier this year and continue to marvel at how fast it performs and how effectively it minimizes ads for devices on my network.

I do also run Pi-hole virtually on my NAS, but I decided to make that my secondary DNS server as this device is connected to the smaller of my two [Uninterruptible power supplies (UPS)](https://en.wikipedia.org/wiki/Uninterruptible_power_supply) and in the event of an extended power outage, that device will automatically power down to ensure the integrity of my data. I needed a low power device to run Pi-hole connected to the larger UPS that runs all of my network equipment.

What I found, was a [Raspberry Pi Zero](https://www.raspberrypi.org/products/raspberry-pi-zero/?resellerType=home) on sale for $7.

<div markdown="1" style="text-align:center">
![Raspberry Pi](/images/raspberry-pi-zero.jpg)
</div>

As I said above, Raspberry Pis will require some accessories to get started... but what made this the perfect option for me was that I had everything I needed to get started. I had a [Micro USB-OTG adapter](https://www.amazon.ca/Micro-USB-OTG-Adapter/s?k=Micro+USB+OTG+Adapter), a [USB Network Adapter](https://www.amazon.ca/s?k=USB+Network+Adapter&ref=nb_sb_noss_2), and a spare [MicroSD card](https://www.amazon.ca/s?k=Micro+SD+card&ref=nb_sb_noss_2). I also decided that I wouldn't even buy a case... I would [build one with lego](https://www.instructables.com/LEGO-Raspberry-Pi-Zero-Case/).

There are a ton of nerds doing great work with Raspberry Pi in a self-hosting context. For the majority of my workloads, they don't make sense... but for this use case, it's pretty cool to be able to talk about my $7 server that consumes 2W of electricity.

:vulcan_salute: