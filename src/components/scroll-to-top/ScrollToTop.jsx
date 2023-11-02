import { ExpandLessRounded } from '@mui/icons-material'
import { Fade, IconButton, Tooltip } from '@mui/material'
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from 'react'

const ScrollToTop = (props) => {
    const { window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
      });
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    
        if (anchor) {
          anchor.scrollIntoView({ block: 'center' });
        }
    };

    return (
        <Fade in={trigger}>
            <Tooltip className='scroll-to-top' title="Lên đầu" placement='top'>
                <IconButton onClick={handleClick}>
                    <ExpandLessRounded />
                </IconButton>
            </Tooltip>
        </Fade>
    )
}

export default ScrollToTop
