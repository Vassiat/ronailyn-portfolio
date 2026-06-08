const linkFavicon = document.getElementById("dynamic-favicon");

function FaviconAnimation() {
    if (!linkFavicon) {
        return
    }


    if (linkFavicon.getAttribute("href") === "/favicon-1.png") {
        linkFavicon.setAttribute("href", "/favicon-2.png");
    } else {
        linkFavicon.setAttribute("href", "/favicon-1.png");
    }

    setTimeout(FaviconAnimation, 1000);
}

FaviconAnimation();