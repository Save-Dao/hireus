import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { illustrations, logos } from 'utils/constants';

const breakpoints = createBreakpoints({
  base: '320px',
  sm: '480px',
  md: '580px',
  lg: '1026px',
  xl: '1800px',
});

export const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    blackDark: 'rgba(10, 10, 10, 0.960784)',
    blackLight: '#2b2c34',
    blackLighter: '#16161a',
    greyLight: '#a7a9be',
    greyDark: '#4a4a4a',
    white: '#fffffe',
    purple: '#822EA6',
    purpleLight: '#B66AD6',
    //this is the main color named 'red'
    red: '#00e600',
    green: '#00e600',
    yellow: '#F2E857',
    yellowDark: '#DCCF11',
  },
  fonts: {
    texturina: `'Texturina', serif`,
    jetbrains: `'JetBrains Mono', monospace`,
    rubik: `'Rubik Mono One', sans-serif`,
    uncial: `'Uncial Antiqua', monospace`,
    VT323: `'VT323', monospace`,
    press2p: `'Press Start 2P', monospace`,
    spaceMono: `'Space Mono', monospace`,
  },
  images: {
    metachilli: logos.meta_chilli,
    daohaus: logos.daohaus,
    moloch: logos.moloch,
    raidguild: logos.raidguild,
    swords: logos.swords,
    smartinvoice: logos.smart_invoice,
    wrapeth: logos.wrapeth,
    raidBanner: illustrations.raid_banner,
    raidFantasy: illustrations.raid_fantasy,
    clouds: illustrations.clouds,
    steps: illustrations.steps,
  },
  breakpoints,
});
