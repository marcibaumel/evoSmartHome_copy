import { StoryObj } from "@storybook/react";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

type Story = StoryObj<typeof Footer>;

export default {
    title: 'Footer',
    component: Footer,
};

const Template = () => <Footer/>

export const Element: Story = {}