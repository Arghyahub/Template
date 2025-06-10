import { Anchor } from 'lucide-react';
const loremTxt = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const config = {
    title: "Title",
    description: "Describes your app in detail",
    logo: "/project/projectIcon.svg",
    moat: "What is your super power",
    heroImg: "/project/heroImg.jpg",
    hook2Scroll: "Hook them to scroll",
    shortFeatures: [
        {name:"Feature 1", description: loremTxt, icon: Anchor},
        {name:"Feature 2", description: loremTxt, icon: Anchor},
        {name:"Feature 3", description: loremTxt, icon: Anchor},
    ],
    longFeatures: [
        {name:"Feature 1", description: loremTxt+loremTxt, img: "/project/feat-long.jpg"},
        {name:"Feature 2", description: loremTxt+loremTxt, img: "/project/feat-long.jpg"},
    ]
}

export default config;