import { Request, Response } from "express";
import puppeteer from "puppeteer";

const ApplicationsController = (req: Request, res: Response) => {
  // destructure request body
  const {
    firstname,
    lastname,
    phone,
    location,
    email,
    linkedin,
    resume,
  } = req.body;
  // do a simple validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (firstname === "") {
    return res.status(400).json({
      message: "First Name Cannot Be Blank",
    });
  }
  if (lastname === "") {
    return res.status(400).json({
      message: "Last Name Cannot Be Blank",
    });
  }
  if (phone === "") {
    return res.status(400).json({
      message: "Phone Number Cannot Be Blank",
    });
  }
  if (phone.length < 6) {
    return res.status(400).json({
      message: "Invalid Phone Number",
    });
  }
  if (location === "") {
    return res.status(400).json({
      message: "Location Cannot Be Blank",
    });
  }
  if (location.length < 3) {
    return res.status(400).json({
      message: "Location too short",
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid Email",
    });
  }
  if (linkedin === "") {
    return res.status(400).json({
      message: "This Field Cannot Be Blank",
    });
  }
  if (resume === "") {
    return res.status(400).json({
      message: "This Field Cannot Be Blank",
    });
  }

  // validation ends

  try {
    //fill the form using puppeteer

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://frontier.jobs/jobs/190562/apply/about", {
        waitUntil: "networkidle2",
      });

      await page.type(
        "#root > main > div > div > section > label:nth-child(2) > div.sc-iwyYcG.hOGmhN > input",
        firstname
      );

      await page.type(
        "#root > main > div > div > section > label:nth-child(3) > div.sc-iwyYcG.hOGmhN > input[name='lastname']",
        lastname
      );

      await page.type(
        "#root > main > div > div > section > label:nth-child(4) > div.sc-iwyYcG.hOGmhN > input[name='email']",
        email
      );

      await page.type(
        "#root > main > div > div > section > label:nth-child(5) > div.sc-iwyYcG.hOGmhN > input[name='phoneno']",
        phone
      );
      await page.type(
        "#root > main > div > div > section > label:nth-child(6) > input[name='location']",
        location,
        { delay: 300 }
      );
      await page.keyboard.down("ArrowDown");
      await page.keyboard.down("Enter");
      await page.type(
        "#root > main > div > div > section > label:nth-child(7) > div.sc-iwyYcG.hOGmhN > input[name='linkedin']",
        linkedin
      );
      await Promise.all([
        page.waitForNavigation({ timeout: 0, waitUntil: "networkidle0" }), // The promise resolves after navigation has finished
        page.click("#root > main > div > footer > a "), // Clicking the link will indirectly cause a navigation
      ]);
      const radio = await page.$(
        "#root > main > div > div > section > label > section > div > label"
      );
      radio?.click();
      //simulate clicking the send button
      await page.click(
        "#root > main > div > footer > a.sc-ehSCib.jDuzGS.sc-epptyN.RpuPK"
      );
      await browser.close();
      res.status(200).json({ message: "Form Filled" });
    })();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Please try Again" });
  }
};

export default ApplicationsController;
