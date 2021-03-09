"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const ApplicationsController = (req, res) => {
    // destructure request body
    const { firstname, lastname, phone, location, email, linkedin, resume, } = req.body;
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
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch({ headless: false });
            const page = yield browser.newPage();
            yield page.goto("https://frontier.jobs/jobs/190562/apply/about", {
                waitUntil: "networkidle2",
            });
            yield page.type("#root > main > div > div > section > label:nth-child(2) > div.sc-iwyYcG.hOGmhN > input", firstname);
            yield page.type("#root > main > div > div > section > label:nth-child(3) > div.sc-iwyYcG.hOGmhN > input[name='lastname']", lastname);
            yield page.type("#root > main > div > div > section > label:nth-child(4) > div.sc-iwyYcG.hOGmhN > input[name='email']", email);
            yield page.type("#root > main > div > div > section > label:nth-child(5) > div.sc-iwyYcG.hOGmhN > input[name='phoneno']", phone);
            yield page.type("#root > main > div > div > section > label:nth-child(6) > input[name='location']", location, { delay: 300 });
            yield page.keyboard.down("ArrowDown");
            yield page.keyboard.down("Enter");
            yield page.type("#root > main > div > div > section > label:nth-child(7) > div.sc-iwyYcG.hOGmhN > input[name='linkedin']", linkedin);
            yield Promise.all([
                page.waitForNavigation({ timeout: 0, waitUntil: "networkidle0" }),
                page.click("#root > main > div > footer > a "), // Clicking the link will indirectly cause a navigation
            ]);
            const radio = yield page.$("#root > main > div > div > section > label > section > div > label");
            radio === null || radio === void 0 ? void 0 : radio.click();
            //simulate clicking the send button
            yield page.click("#root > main > div > footer > a.sc-ehSCib.jDuzGS.sc-epptyN.RpuPK");
            yield browser.close();
            res.status(200).json({ message: "Form Filled" });
        }))();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Please try Again" });
    }
};
exports.default = ApplicationsController;
