import React from 'react'

import Card from "./Card"

export function Category({ title, imgSrc, link }) {
	return (
		<Link to={link}>
			<Card imgSrc={imgSrc} className="!max-w-40 sm:(!max-w-56)">
				<div className={clsx(
	      	"absolute inset-0 text-white text-center",
	      	"flex justify-center items-center",
	      	"transition duration-500 ease-out",
	      	"group-hover:(bg-black/40)"
      	)}>
	      	<h3 className="text-2xl font-bold tracking-widest uppercase p-4 bg-black/30">{title}</h3>
	      </div>
			</Card>
		</Link>
	)
}