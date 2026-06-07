const linkFavicon = document.getElementById("dynamic-favicon");

function FaviconAnimation() {
    if (!linkFavicon) {
        return
    }


    if (linkFavicon.getAttribute("href") === "/favicon-1.jpeg") {
        linkFavicon.setAttribute("href", "/favicon-2.jpeg");
    } else {
        linkFavicon.setAttribute("href", "/favicon-1.jpeg");
    }

    setTimeout(FaviconAnimation, 1000);
}

FaviconAnimation();