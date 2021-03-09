"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnderWeight = 18.5;
const NormalWeightMin = 18.6;
const NormalWeightMax = 25;
const OverWeightMin = 25.1;
const OverWeightMax = 30;
const bmiCalculator = (height, mass) => {
    console.log(mass / ((height * height) / 10000));
    if ((mass / height / height) * 10000 <= UnderWeight) {
        return "UnderWeight ";
    }
    if ((mass / height / height) * 10000 >= NormalWeightMin &&
        (mass / height / height) * 10000 <= NormalWeightMax) {
        return " Normal (Healthy Weight)";
    }
    if ((mass / height / height) * 10000 >= OverWeightMin &&
        (mass / height / height) * 10000 <= OverWeightMax) {
        return " Overweight ";
    }
    if ((mass / height / height) * 10000 >= OverWeightMax) {
        return " Obese";
    }
};
exports.default = bmiCalculator;
