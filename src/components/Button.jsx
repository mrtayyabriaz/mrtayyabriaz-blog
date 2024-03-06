import React from 'react'

function Button({
  children,
  className,
  ...props
}) {
  return (
    <button
      className={`${className} rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'`}
      {...props}
    >{children}</button>
  )
}

export default Button