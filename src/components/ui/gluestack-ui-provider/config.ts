'use client';
import { vars } from 'nativewind';

export const config = {
  light: vars({
    '--color-background': '255 255 255',
    '--color-foreground': '15 23 42',
    '--color-primary': '14 165 233',
    '--color-primary-foreground': '255 255 255',
    '--color-secondary': '217 70 239',
    '--color-secondary-foreground': '255 255 255',
    '--color-muted': '241 245 249',
    '--color-muted-foreground': '100 116 139',
    '--color-accent': '241 245 249',
    '--color-accent-foreground': '15 23 42',
    '--color-destructive': '239 68 68',
    '--color-destructive-foreground': '255 255 255',
    '--color-border': '226 232 240',
    '--color-input': '226 232 240',
    '--color-ring': '14 165 233',
  }),
  dark: vars({
    '--color-background': '15 23 42',
    '--color-foreground': '248 250 252',
    '--color-primary': '14 165 233',
    '--color-primary-foreground': '15 23 42',
    '--color-secondary': '217 70 239',
    '--color-secondary-foreground': '255 255 255',
    '--color-muted': '30 41 59',
    '--color-muted-foreground': '148 163 184',
    '--color-accent': '30 41 59',
    '--color-accent-foreground': '248 250 252',
    '--color-destructive': '127 29 29',
    '--color-destructive-foreground': '248 250 252',
    '--color-border': '51 65 85',
    '--color-input': '51 65 85',
    '--color-ring': '59 130 246',
  }),
};
