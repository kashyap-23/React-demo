import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

function Fcarosusel() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    return (
        <div className='mt-5'>
            <ReactSimplyCarousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={1}
                autoplay={true}


                itemsToScroll={1}
                forwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        background: 'black',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        height: 30,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 30,
                    },
                    children: <span>{`>`}</span>,
                }}
                backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        background: 'black',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        height: 30,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 30,
                    },
                    children: <span>{`<`}</span>,
                }}
                responsiveProps={[
                    {
                        itemsToShow: 1,
                        itemsToScroll: 1,
                        minWidth: 768,
                    },
                ]}
                speed={400}
                easing="linear"
            >
                {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
                <div style={{ width: 1000, height: 450, }}>
                    <img src="https://marketplace-cdn.atlassian.com/files/422562e8-0358-462a-8dca-301eeb611c93?fileType=image&mode=full-fit" width={1000} alt="" />
                </div>
                <div style={{ width: 1000, height: 450, }}>
                    <img src="https://t3.ftcdn.net/jpg/02/16/03/28/360_F_216032849_rE3hjVYDhZMeO5OxE9bWsH7jYSucG3Ky.jpg" width={1000} alt="" />
                </div>
                <div style={{ width: 1000, height: 450, }}>
                    <img src="https://e1.pxfuel.com/desktop-wallpaper/125/969/desktop-wallpaper-web-development-posted-by-sarah-anderson-full-stack.jpg" width={1000} alt="" />
                </div>
                <div style={{ width: 1000, height: 450, }}>
                    <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/336072064/original/6428f500c92850befd71d58abf50780bff0bc89f/develop-html-css-javascript-web-pages-for-front-end.jpg" width={1000} alt="" />
                </div>
                <div style={{ width: 1000, height: 450, }}>
                    <img src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_640.png" width={1000} alt="" />
                </div>


            </ReactSimplyCarousel>
        </div >
    );
}

export default Fcarosusel;