import { StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

type Story = StoryObj<typeof Logo>;

export default {
    title: 'Logo',
    component: Logo
}

const Template = () => <Logo />

export const Element: Story = {}