import React from 'react'

export default function ProductHuntUpvotes () {
  return (
    <>
      <div className="product-hunt-upvotes">
        <a
          href="https://www.producthunt.com/posts/retro-sprite-creator?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-retro-sprite-creator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=258468"
            alt="Retro Sprite Creator - Create Retro Character Sprites - No Skills Required | Product Hunt Embed"
            width="250" height="54" />
        </a>
      </div>
      <style jsx>{`
        .product-hunt-upvotes {
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }
      `}</style>
    </>
  )
}
