import React from 'react';
import { Story } from '@storybook/react';
import styled from '@emotion/styled';

import { ClockColor } from './ClockColor';
import { ArrowDownRoundedOutline } from './ArrowDownRoundedOutline';
import { ArrowDownOutline } from './ArrowDownOutline';
import { ArrowLeftOutline } from './ArrowLeftOutline';
import { ArrowRightOutline } from './ArrowRightOutline';
import { ArrowUpRoundedOutline } from './ArrowUpRoundedOutline';
import { ArrowUpOutline } from './ArrowUpOutline';
import { ChevronDownOutline } from './ChevronDownOutline';
import { ChevronLeftOutline } from './ChevronLeftOutline';
import { ChevronRightOutline } from './ChevronRightOutline';
import { ChevronUpOutline } from './ChevronUpOutline';
import { ChevronsDownOutline } from './ChevronsDownOutline';

export default { title: 'Design element/Icon' };
interface BoxProps {
  children: any;
  color: string;
  size: number;
  title?: string;
}
const BoxStyled = styled.div<Partial<BoxProps>>`
  display: inline-block;
  padding: 20px 4px;
  margin: 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: ${({ color }) => color};
  width: 160px;
  font-size: ${({ size }) => size}px;
  text-align: center;
  word-wrap: break-word;
  &:hover {
    border-color: #ccc;
  }
`;
const Box = ({ children, title = '', ...props }: BoxProps) => (
  <BoxStyled {...props}>
    {children}
    <span style={{ display: 'block', fontSize: 14 }}>{title}</span>
  </BoxStyled>
);
const Template: Story<BoxProps> = args => (
  <div>
    <Box title={'ClockColor'} {...args}>
      <ClockColor />
    </Box>
    <Box title={'ArrowDownRoundedOutline'} {...args}>
      <ArrowDownRoundedOutline />
    </Box>
    <Box title={'ArrowDownOutline'} {...args}>
      <ArrowDownOutline />
    </Box>
    <Box title={'ArrowLeftOutline'} {...args}>
      <ArrowLeftOutline />
    </Box>
    <Box title={'ArrowRightOutline'} {...args}>
      <ArrowRightOutline />
    </Box>
    <Box title={'ArrowUpRoundedOutline'} {...args}>
      <ArrowUpRoundedOutline />
    </Box>
    <Box title={'ArrowUpOutline'} {...args}>
      <ArrowUpOutline />
    </Box>
    <Box title={'ChevronDownOutline'} {...args}>
      <ChevronDownOutline />
    </Box>
    <Box title={'ChevronLeftOutline'} {...args}>
      <ChevronLeftOutline />
    </Box>
    <Box title={'ChevronRightOutline'} {...args}>
      <ChevronRightOutline />
    </Box>
    <Box title={'ChevronUpOutline'} {...args}>
      <ChevronUpOutline />
    </Box>
    <Box title={'ChevronsDownOutline'} {...args}>
      <ChevronsDownOutline />
    </Box>
  </div>
);
export const All = Template.bind({});
All.args = {
  color: '#333333',
  size: 24
};
