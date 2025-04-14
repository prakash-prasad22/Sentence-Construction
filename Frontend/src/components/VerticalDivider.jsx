import React from 'react'

/**
 * VerticalDivider Component
 * -------------------------
 * Renders a vertical divider line.
 *
 * Overview:
 * This component creates a vertical divider, a thin line that can be used to visually
 * separate sections of content.  It's styled with a fixed width and height, and a
 * background color.
 *
 * Features:
 * -   Displays a vertical line.
 * -   Has a fixed width of 1 pixel.
 * -   Has a fixed height of 100 pixels.
 * -   Has a background color of gray-600.
 *
 * Technical Details:
 * -   Uses a <div> element to render the divider.
 * -   Uses inline styles to set the width, height, and background color.
 * -   Uses Tailwind CSS classes for styling.
 */

function VerticalDivider() {
  return (
    <div className='min-w-[1px] max-w-[1px]  h-[100px] bg-gray-600'></div>
  )
}

export default VerticalDivider