---
title: 'Digitize the Family Calendar'
date: 2021-03-30
permalink: /posts/2021/03/family-calendar/
tags:
  - life
  - technology
---

Family life can be busy, especially with a couple of tweens and dogs. Staying on top of the appointments, athletics, birthdays, and to dos can be challenging. 

For the longest time, Alicia managed a physical whiteboard calendar and once a month, she'd pull it off the wall, wipe it down... and update it for the month ahead. This was a lot of work for her and it was inconvenient to maintain, so we decided to move this to a digital solution because...

<div markdown="1" style="text-align:center">
![meme-drake-family-calendar](/images/meme-drake-family-calendar.PNG)
</div>

Early on during the requirements phase, Alicia was adamant that she wanted to interact with a digital screen with touch controls to manage the content. This dramatically increases the complexity and cost of the solution... so I wouldn't recommend it. Also, with the solution I came up with, you're just managing the content from your phone or computer anyways. Easy peasy.

Let's start by me showing you the final product and discussing the different types of content you can display on this solution... then we'll get into what you'll need if you'd like to do something similar. I present... the Kirk Family Calendar!

<div markdown="1" style="text-align:center">
![Calendar Up Close](/images/kirk-family-calendar.jpg)
![Calendar Zoom Out](/images/kirk-family-calendar-zoomout.jpg)
![Calendar Screenshot](/images/kirk-family-calendar-screenshot.PNG)
</div>

Here's a quick summary of the information we're displaying here:

1. Family Calendar (sourced from a shared Google Calendar)
2. Family To Do List (sourced from a shared Microsoft To Do list)
3. Family Photo Album (sourced from Google Photos)
4. Toronto Raptors Schedule (imported into a shared Google Calendar)
5. Current Date and Time
6. Weather Data with 5-day Forecast
7. News (sourced from CBC News)

The star of the show in this solution is [Dakboard](http://dakboard.com/). There are other options available, of course... many of which the nerd community would view as _nerdier_, but the free tier in Dakboard allows me to present all of the information above with relative ease. It's a simple content management system that you can configure in a matter of minutes. At the time of this writing, for $5/month, you can upgrade to Dakboard's Essential Plan which provides more layout customization and additional content type integrations... for me, the free tier is more than adequate.

What will you need to pull this off?

1. A spare television or monitor: We opted to upgrade our family room TV and move the existing 42" TV to this role.
2. A low profile wall mount. There are tons of cheap options on Amazon.
3. A computer to drive the display: I opted for a used [Raspberry Pi 3b](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/).
4. Raspberry Pi accessories: [a case](https://www.buyapi.ca/product-category/raspberry-pi/raspberry-pi-cases/), [a MicroSD card](https://www.amazon.ca/Sandisk-Ultra-Micro-UHS-I-Adapter/dp/B073K14CVB/ref=sr_1_5?dchild=1&keywords=16gb+micro+sd+card&qid=1617101396&sr=8-5) (8-16GB), [a power adapter](https://www.buyapi.ca/product-category/raspberry-pi/raspberry-pi-power-supplies/).
5. A short HDMI cable, a 1 footer off Amazon is ideal.
6. Some velcro tape to mount the Raspberry Pi on the back of the TV.

Dakboard does [sell pre-configured Raspberry Pis](https://shop.dakboard.com/) for this purpose if a DIY project like this isn't your style. To their credit, they have also [published instructions on how to DIY this project](https://blog.dakboard.com/diy-wall-display/). Alternatively, there is a lot of YouTube content on this topic that helped inspire and instruct me.

We're really seeing the benefits of digitizing our family life in this way. The ability to display your most cherished family photos will also put a smile on your face every time you walk by.

:vulcan_salute: