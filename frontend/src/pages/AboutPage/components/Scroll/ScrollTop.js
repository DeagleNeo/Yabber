import ScrollToTop from "react-scroll-to-top";

const ScrollTop = () => {
    return (
        <ScrollToTop smooth style={{
            "color": "#ffffff",
            "background-color": "#680a83",
            "font-size": "0.83333333333333rem",
            "border-radius": "2px",
            "position": "fixed",
            "text-align": "center",
            "cursor": "pointer",
            "z-index": "99",
            "width": "2.3em",
            "height": "2.3em",
            "line-height": "2.3"
        }} component={
            <i className="fa-solid fa-angle-up" />
        }/>  
    )
}

export default ScrollTop