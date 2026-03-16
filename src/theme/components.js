const components = {
MuiCssBaseline: {
  styleOverrides: {
    body: {
      background: `
        radial-gradient(
          circle at 65% 45%,
          rgba(170, 20, 30, 0.55) 0%,
          rgba(120, 10, 18, 0.45) 28%,
          rgba(60, 5, 10, 0.35) 55%,
          rgba(20, 3, 7, 0.95) 85%
        ),
        radial-gradient(
          circle at center,
          transparent 60%,
          #140307 100%
        ),
        linear-gradient(
          135deg,
          #120205 0%,
          #1a0308 40%,
          #0f0205 100%
        )
      `,
      backgroundColor: '#140307',
    },
  },
},
 MuiAppBar: {
  styleOverrides: {
    root: {
      background: 'rgba(10, 2, 5, 0.55)',
      backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(255, 110, 140, 0.08)',
      boxShadow: 'none',
    },
  },
},
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        border: '1px solid rgba(255, 110, 140, 0.10)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.30)',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        paddingInline: 18,
        paddingBlock: 10,
      },
      containedPrimary: {
        background: 'linear-gradient(135deg, #ff5c7a 0%, #ff7a92 100%)',
        boxShadow: '0 0 24px rgba(255, 92, 122, 0.28)',
      },
      outlinedPrimary: {
        borderColor: 'rgba(255, 110, 140, 0.35)',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255, 110, 140, 0.14)',
        color: '#fff1f3',
      },
    },
  },
}

export default components