export const Roadmap = () => {
  return (
    <div className='road-map-container'>
      <div className='container'>
        <h3 className='road-map__h3'> Roadmap</h3>
        <div className='show-lg'>
          <div className='road-map-circles'>
            <div className='road-map-circle road-map-circle--orange'>
              {/* <img src={ufo} /> */}
            </div>
            <div className='road-map-circle road-map-circle--green'>
              {/* <img src={meteor} /> */}
            </div>
            <div className='road-map-circle road-map-circle--mint'></div>
            <div className='road-map-circle road-map-circle--grey'></div>
          </div>
          <div className='timeline'>
            {/* <img src={timeline} /> */}
          </div>
        </div>
        <div className='road-map'>
          <div className='road-map-card'>
            <div className='road-map-card__date'>October 2021</div>
            <h4 className='road-map-card__h4'>Pre-sale</h4>
            <div className='road-map-card__text'>
              October will see a flurry of activity:
              <br />
              - Private Sale for closest supporters.
              <br />
              - Pre-Season launch for folks who were early followers
              <br />- Pre-Sale fundraiser for 9000 pre-sale tokens redeemable
              for Scapes upon full November-December launch
            </div>
          </div>
          <div className='road-map-card road-map-card--featured'>
            <div className='road-map-card__date'>December 2021</div>
            <h4 className='road-map-card__h4'>Season 1 launch</h4>
            <div className='road-map-card__text'>
              Season 1 delivers Scapes to holders of pre-sale tokens, up to 9000
              units. Any Scapes not distributed via FLP will eligible to mint.
            </div>
            <h4 className='road-map-card__h4'>Lightyr launch</h4>
            <div className='road-map-card__text'>
              Lightyr opens project registrations. In preparation for release of
              our attribute trading protocol, marketplace, and storefront,
              Lightyr will start building a queue of projects.
            </div>
          </div>
          <div className='road-map-card road-map-card--featured'>
            <div className='road-map-card__date'>January 2022</div>
            <h4 className='road-map-card__h4'>
              Productization, marketplaces and storefront
            </h4>
            <div className='road-map-card__text'>
              <div>
                <b>Productization:</b> Lightyr team will open our
                dismantle/assemble mechanic and attribute inventory to other
                projects, ushering in a totally new kind of NFT experience or
                the masses.
              </div>
              <div>
                <b>Marketplaces:</b> Deliver first versions of Paired
                Marketplaces, markets with full NFTs and attributes living in
                harmony.
                <br />
              </div>
              <div>
                <b>Storefront:</b> Digital retail of new limited-run attributes,
                allowing projects to introduce new ideas outside of a season.
                <br />
              </div>
            </div>
          </div>
          <div className='road-map-card road-map-card--featured'>
            <div className='road-map-card__date'>February 2022</div>
            <h4 className='road-map-card__h4'>Season 2 launch</h4>
            <div className='road-map-card__text'>
              Season 2 will be our Ancient Times season, including Greek
              architecture, the 7 Wonders of the World, aliens building the
              pyramids, trebuchets and more!
            </div>
          </div>
          <div className='road-map-card road-map-card--featured'>
            <div className='road-map-card__date'>April 2022</div>
            <h4 className='road-map-card__h4'>Season 3 launch</h4>
            <div className='road-map-card__text'>
              In Season 3, we take to the stars for our space season, exploring
              all your favorite Sci-fi classics, galaxies, alien worlds, binary
              star systems, Oort clouds, and… Heaven?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
