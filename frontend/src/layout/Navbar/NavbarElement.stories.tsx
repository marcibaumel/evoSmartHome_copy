import { StoryObj } from "@storybook/react";
import { NavbarElement, navBarElementProps } from "./NavbarElement";
import 'bootstrap/dist/css/bootstrap.min.css';

type Story = StoryObj<typeof NavbarElement>;

export default {
    title: 'NavbarElement',
    component: NavbarElement,
};

const Template = (args: navBarElementProps) => <NavbarElement {...args} />

export const Element: Story = {
    args: {
        index: 0,
        name: 'Devices',
        route: '/device'
    }
}