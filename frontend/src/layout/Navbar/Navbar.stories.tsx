import { StoryObj } from "@storybook/react";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

type Story = StoryObj<typeof Navbar>;

export default {
    title: 'Navbar',
    component: Navbar,
};

const Template = () => <Navbar/>

export const Element: Story = {}