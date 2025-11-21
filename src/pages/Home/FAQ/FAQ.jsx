import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="pt-24">
      <div className="flex flex-col gap-3.5 justify-center items-center max-w-[800px] mx-auto text-center mb-10">
        <h2 className="text-4xl font-extrabold text-secondary">Frequently Asked Question (FAQ)</h2>
        <p className="text-info leading-6">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        </p>
      </div>

      <div className="max-w-[800px] mx-auto space-y-4">
        {/* Panel 1 */}
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          className="rounded-full"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How does this posture corrector work?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="border-b border-[#C3DFE2] mb-6"></div>
            <Typography>
              A posture corrector works by providing support and gentle alignment to your shoulders,
              back, and spine, encouraging you to maintain proper posture throughout the day. Here’s
              how it typically functions: A posture corrector works by providing support and gentle
              alignment to your shoulders.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Panel 2 */}
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Is it suitable for all ages and body types?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A posture corrector works by providing support and gentle alignment to your shoulders,
              back, and spine, encouraging you to maintain proper posture throughout the day. Here’s
              how it typically functions: A posture corrector works by providing support and gentle
              alignment to your shoulders.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Panel 3 */}
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Does it really help with back pain and posture improvement?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A posture corrector works by providing support and gentle alignment to your shoulders,
              back, and spine, encouraging you to maintain proper posture throughout the day. Here’s
              how it typically functions: A posture corrector works by providing support and gentle
              alignment to your shoulders.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Panel 4 */}
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="border-b">
            <Typography>Does it have smart features like vibration alerts?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A posture corrector works by providing support and gentle alignment to your shoulders,
              back, and spine, encouraging you to maintain proper posture throughout the day. Here's
              how it typically functions: A posture corrector works by providing support and gentle
              alignment to your shoulders.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Panel 5 */}
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How will I be notified when the product is back in stock?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A posture corrector works by providing support and gentle alignment to your shoulders,
              back, and spine, encouraging you to maintain proper posture throughout the day. Here’s
              how it typically functions: A posture corrector works by providing support and gentle
              alignment to your shoulders.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
