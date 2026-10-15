$(window).on('load', function () {
    $('#loader').addClass('hide');
});




$('.experts__carousel').owlCarousel({
    items: 4,
    loop: false,
    margin: 24,
    nav: true,
    dots: false,
    autoplay: false,
    autoplayHoverPause: true,
    smartSpeed: 900,
    autoWidth: false,
    responsive: {
        0: {
            items: 1,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4500
        },
        576: {
            items: 2,
            loop: true,
            dots: true,
            nav: false,
            autoplay: true,
            autoplayTimeout: 4500
        },
        992: {
            items: 3,
            loop: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4500
        },
        1200: {
            items: 4,
            loop: false,
            dots: false,
            autoplay: false
        }
    }
})

$('.why_winson__carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 900,
    autoWidth: false,
    responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 1 },
        992: { items: 1 },
        1200: { items: 1 }
    }
})


$('.home_news__carousel').owlCarousel({
    items: 4,
    loop: true,
    margin: 24,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4500,
    autoplayHoverPause: true,
    smartSpeed: 800,
    navText: [
        '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M20.5 6.5 11 16l9.5 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M11.5 6.5 21 16l-9.5 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    responsive: {
        0: {
            items: 1,
            margin: 18,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4500
        },
        576: {
            items: 2,
            margin: 20,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4500
        },
        992: {
            items: 3,
            margin: 22,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4500
        },
        1200: {
            items: 4,
            margin: 24,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4500
        }
    }
})
var teamContinuousCarousels = [];
var teamResizeTimer;
var teamCarouselSpeed = 5200;

function playTeamContinuousCarousel($carousel, speed) {
    clearTimeout($carousel.data('teamPlayTimer'));

    var playTimer = setTimeout(function () {
        if (!$carousel.data('owl.carousel')) {
            return;
        }

        $carousel.trigger('stop.owl.autoplay');
        $carousel.trigger('play.owl.autoplay', [speed]);
    }, 80);

    $carousel.data('teamPlayTimer', playTimer);
}

function initTeamContinuousCarousel(selector, rtlMode) {
    var $carousel = $(selector);

    if (!$carousel.length) {
        return;
    }

    $carousel.owlCarousel({
        loop: true,
        autoWidth: true,
        margin: 40,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 1,
        autoplaySpeed: teamCarouselSpeed,
        smartSpeed: teamCarouselSpeed,
        fluidSpeed: teamCarouselSpeed,
        slideTransition: 'linear',
        autoplayHoverPause: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        freeDrag: false,
        rtl: rtlMode,
        responsiveRefreshRate: 80
    });

    teamContinuousCarousels.push($carousel);
    playTeamContinuousCarousel($carousel, teamCarouselSpeed);
}

$(function () {
    initTeamContinuousCarousel('.teams__carousel--one', false);
    initTeamContinuousCarousel('.teams__carousel--two', true);
    initTeamContinuousCarousel('.teams__carousel--three', false);

    $(window).on('resize orientationchange', function () {
        clearTimeout(teamResizeTimer);

        teamResizeTimer = setTimeout(function () {
            teamContinuousCarousels.forEach(function ($carousel) {
                $carousel.trigger('refresh.owl.carousel');
                playTeamContinuousCarousel($carousel, teamCarouselSpeed);
            });
        }, 300);
    });
});


function initAchievementsMap() {
    var section = document.querySelector('.achievements');

    if (!section) {
        return;
    }

    var pins = Array.prototype.slice.call(section.querySelectorAll('.achievements__pin'));
    var title = section.querySelector('#achievementTitle');
    var icon = section.querySelector('#achievementIcon');
    var list = section.querySelector('#achievementList');
    var card = section.querySelector('.achievements__card');
    var carousel = section.querySelector('.achievements__carousel');
    var $carousel = carousel && window.jQuery ? jQuery(carousel) : null;
    var activeIndex = 0;
    var autoTimer;
    var autoDelay = 4200;

    if (!pins.length || !title || !icon || !list) {
        return;
    }

    function isResponsiveAchievements() {
        return window.matchMedia('(max-width: 1199px)').matches;
    }

    function getPinItems(pin) {
        return (pin.dataset.items || '').split('|').filter(Boolean);
    }

    function cardMarkup(pin) {
        var items = getPinItems(pin);
        var itemMarkup = items.map(function (item) {
            return '<li>' + item + '</li>';
        }).join('');

        return '<article class="achievements__slide-card">' +
            '<div class="achievements__card-head">' +
            '<h3>' + (pin.dataset.title || '') + '</h3>' +
            '<img src="' + (pin.dataset.icon || 'images/blue_map/map_land_mark_icon.svg') + '" alt="" aria-hidden="true">' +
            '</div>' +
            '<ul>' + itemMarkup + '</ul>' +
            '</article>';
    }

    if (carousel && !carousel.children.length) {
        carousel.innerHTML = pins.map(function (pin, index) {
            pin.dataset.achievementIndex = index;
            return '<div class="achievements__carousel-item" data-achievement-index="' + index + '">' + cardMarkup(pin) + '</div>';
        }).join('');
    } else {
        pins.forEach(function (pin, index) {
            pin.dataset.achievementIndex = index;
        });
    }

    if ($carousel && !$carousel.hasClass('owl-loaded')) {
        $carousel.owlCarousel({
            items: 2,
            loop: true,
            margin: 22,
            nav: false,
            dots: false,
            autoplay: false,
            autoplayTimeout: autoDelay,
            autoplayHoverPause: true,
            smartSpeed: 550,
            responsive: {
                0: {
                    items: 1,
                    margin: 16,
                    autoplay: true,
                    autoplayTimeout: autoDelay
                },
                768: {
                    items: 2,
                    margin: 22,
                    autoplay: true,
                    dots: true,
                    autoplayTimeout: autoDelay
                },
                1200: {
                    items: 2,
                    margin: 22,
                    autoplay: false
                }
            }
        });

        $carousel.on('changed.owl.carousel', function (event) {
            var $currentItem = event.relatedTarget.$stage.children().eq(event.item.index).find('[data-achievement-index]').first();
            var index = parseInt($currentItem.attr('data-achievement-index') || '0', 10);
            var pin = pins[index];

            if (pin) {
                setActivePin(pin, true, true);
            }
        });
    }

    function stopAutoChange() {
        clearInterval(autoTimer);
    }

    function startAutoChange() {
        stopAutoChange();

        if (isResponsiveAchievements()) {
            if ($carousel && $carousel.hasClass('owl-loaded')) {
                $carousel.trigger('play.owl.autoplay', [autoDelay]);
            }
            return;
        }

        if ($carousel && $carousel.hasClass('owl-loaded')) {
            $carousel.trigger('stop.owl.autoplay');
        }

        autoTimer = setInterval(function () {
            var nextIndex = (activeIndex + 1) % pins.length;
            setActivePin(pins[nextIndex], false, true);
        }, autoDelay);
    }

    function setActivePin(pin, skipCarousel, skipAutoRestart) {
        var items = getPinItems(pin);
        var region = pin.dataset.region || '';
        var index = parseInt(pin.dataset.achievementIndex || '0', 10);

        activeIndex = index;

        pins.forEach(function (item) {
            item.classList.toggle('achievements__pin--active', item === pin);
            item.setAttribute('aria-pressed', item === pin ? 'true' : 'false');
        });

        section.classList.toggle('achievements--china', region === 'china');
        section.dataset.activeRegion = region;

        if (card) {
            card.classList.remove('achievements__card--animate');
        }

        title.textContent = pin.dataset.title || '';
        icon.src = pin.dataset.icon || 'images/blue_map/map_land_mark_icon.svg';
        list.innerHTML = items.map(function (item) {
            return '<li>' + item + '</li>';
        }).join('');

        if (card) {
            void card.offsetWidth;
            card.classList.add('achievements__card--animate');
        }

        if (!skipCarousel && $carousel && $carousel.hasClass('owl-loaded')) {
            $carousel.trigger('to.owl.carousel', [index, 450, true]);
        }

        if (!skipAutoRestart) {
            startAutoChange();
        }
    }

    pins.forEach(function (pin) {
        if (pin.classList.contains('achievements__pin--active')) {
            activeIndex = parseInt(pin.dataset.achievementIndex || '0', 10);
        }

        pin.setAttribute('aria-pressed', pin.classList.contains('achievements__pin--active') ? 'true' : 'false');
        pin.addEventListener('click', function () {
            setActivePin(pin, false, false);
        });
    });

    window.addEventListener('resize', function () {
        clearTimeout(section.achievementsResizeTimer);
        section.achievementsResizeTimer = setTimeout(startAutoChange, 220);
    });

    startAutoChange();
}
function initAnalysisFileUpload() {
    var fileInput = document.getElementById('analysisFiles');
    var fileName = document.getElementById('analysisFileName');

    if (!fileInput || !fileName) {
        return;
    }

    fileInput.addEventListener('change', function () {
        var files = Array.prototype.slice.call(fileInput.files || []);

        if (!files.length) {
            fileName.textContent = 'No file selected';
            return;
        }

        if (files.length === 1) {
            fileName.textContent = files[0].name;
            return;
        }

        fileName.textContent = files.length + ' files selected: ' + files.map(function (file) {
            return file.name;
        }).join(', ');
    });
}
function initSelectFields() {
    if (!window.jQuery || !jQuery.fn.select2) {
        return;
    }

    jQuery('select').each(function () {
        var $select = jQuery(this);
        var $field = $select.closest('.analysis__field');

        $select.select2({
            width: '100%',
            minimumResultsForSearch: Infinity,
            dropdownParent: $field.length ? $field : jQuery(document.body)
        });
    });
}
function initMobileMenuOutsideClose() {
    var menuButton = document.getElementById('menu-btn');
    var nav = document.querySelector('.header nav');
    var menuIcon = document.querySelector('.btn.menu-btn svg');

    if (!menuButton || !nav) {
        return;
    }

    function closeMobileMenu() {
        menuButton.checked = false;

        if (menuIcon) {
            menuIcon.classList.remove('opened');
            menuIcon.setAttribute('aria-expanded', 'false');
        }
    }

    document.addEventListener('click', function (event) {
        if (!menuButton.checked || nav.contains(event.target)) {
            return;
        }

        closeMobileMenu();
    });
}
function initHomeCoverageMap() {
    var mapElement = document.getElementById('homeCoverageMap');
    var carousel = document.querySelector('.home_map__carousel');
    var $carousel = carousel && window.jQuery ? jQuery(carousel) : null;

    var locations = [
        { name: 'Cairo', coordinates: [30.0444, 31.2357], address: 'Cairo, Egypt', email: 'info@winson.com' },
        { name: 'Baghdad', label: 'Baghdad', title: 'Baghdad(Iraq)', coordinates: [33.3152, 44.3661], address: 'Block 317, Lane 3, House 32/44, Al-Baqir District, Al-Aswaq Al-Markaziya Street, Al-Shaab, Baghdad, Iraq', email: 'info@winson.com', active: true },
        { name: 'Riyadh', coordinates: [24.7136, 46.6753], address: 'Riyadh, Saudi Arabia', email: 'info@winson.com' },
        { name: 'Dubai', coordinates: [25.2048, 55.2708], address: 'Dubai, United Arab Emirates', email: 'info@winson.com' },
        { name: 'Oman', coordinates: [23.5880, 58.3829], address: 'Muscat, Oman', email: 'info@winson.com' },
        { name: 'Shanghai', coordinates: [31.2304, 121.4737], address: 'Shanghai, China', email: 'info@winson.com' },
        { name: 'Beijing', coordinates: [39.9042, 116.4074], address: 'Beijing, China', email: 'info@winson.com' },
        { name: 'Hangzhou', coordinates: [30.2741, 120.1551], address: 'Hangzhou, China', email: 'info@winson.com' }
    ];

    function popupContent(location) {
        return '<div class="home_map__popup"><h3>' + (location.title || location.name) + '</h3><p>' + location.address + '</p><a href="mailto:' + location.email + '"><svg viewBox="0 0 18 14" aria-hidden="true" focusable="false"><path d="M1.5 1.5h15v11h-15z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="m2 2 7 5 7-5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>' + location.email + '</a></div>';
    }

    function initHomeCoverageCarousel() {
        if (!$carousel || $carousel.hasClass('owl-loaded')) {
            return;
        }

        carousel.innerHTML = locations.map(function (location) {
            return '<div class="home_map__carousel-item">' + popupContent(location) + '</div>';
        }).join('');

        $carousel.owlCarousel({
            items: 1,
            loop: true,
            margin: 18,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4500,
            autoplayHoverPause: true,
            smartSpeed: 650
        });
    }

    initHomeCoverageCarousel();

    function markerIcon(label) {
        return L.divIcon({
            className: 'home_map__marker-icon',
            iconSize: [120, 64],
            iconAnchor: [60, 42],
            popupAnchor: [0, -56],
            html: '<span class="home_map__marker"><img src="images/map_pointer.svg" alt="" aria-hidden="true"><span>' + label + '</span></span>'
        });
    }

    var map;

    function initLeafletMap() {
        if (!mapElement || typeof L === 'undefined' || map || window.matchMedia('(max-width: 767px)').matches) {
            return;
        }

        map = L.map(mapElement, {
            zoomControl: true,
            attributionControl: false,
            scrollWheelZoom: false,
            doubleClickZoom: true,
            dragging: true,
            touchZoom: true,
            boxZoom: true,
            tap: true
        }).setView([31, 76], 4);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 6,
            minZoom: 2,
            subdomains: 'abcd'
        }).addTo(map);

        var wheelZoomTimer;

        mapElement.addEventListener('wheel', function (event) {
            if (!event.ctrlKey) {
                map.scrollWheelZoom.disable();
                return;
            }

            map.scrollWheelZoom.enable();
            clearTimeout(wheelZoomTimer);
            wheelZoomTimer = setTimeout(function () {
                map.scrollWheelZoom.disable();
            }, 350);
        }, { passive: true, capture: true });

        var activeMarker;

        locations.forEach(function (location) {
            var marker = L.marker(location.coordinates, {
                icon: markerIcon(location.label || location.name),
                keyboard: true,
                title: location.name
            }).addTo(map);

            marker.bindPopup(popupContent(location), {
                closeButton: true,
                autoPan: true,
                keepInView: false,
                autoPanPaddingTopLeft: [24, 24],
                autoPanPaddingBottomRight: [24, 24],
                className: 'home_map__leaflet-popup'
            });

            if (location.active) {
                activeMarker = marker;
            }
        });

        if (activeMarker) {
            activeMarker.openPopup();
        }

        setTimeout(function () {
            map.invalidateSize();
        }, 250);
    }

    initLeafletMap();

    window.addEventListener('resize', function () {
        if (!mapElement) {
            return;
        }

        clearTimeout(mapElement.homeMapResizeTimer);
        mapElement.homeMapResizeTimer = setTimeout(function () {
            initLeafletMap();

            if (!map || window.matchMedia('(max-width: 767px)').matches) {
                return;
            }

            map.invalidateSize();
            map.setView([31, 76], 4, { animate: false });
        }, 200);
    });
}
jQuery('.flexslider').flexslider({
    animation: "fade",
    controlNav: false,
    directionNav: true,
    touch: true,
    drag: true,
    prevText: "<img src='images/left.svg'>",
    nextText: "<img src='images/right.svg'>",
});






AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    once: false, // whether animation should happen only once - while scrolling down
});





$(document).ready(function () {
    $(".searchs").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".search_bar").addClass("shows");
    });

    $(".search_bar").on("click", function (e) {
        e.stopPropagation();
    });

    $(".close_search").on("click", function (e) {
        e.preventDefault();
        $(".search_bar").removeClass("shows");
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".search_bar, .searchs").length) {
            $(".search_bar").removeClass("shows");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    initAchievementsMap();
    initHomeCoverageMap();
    initAnalysisFileUpload();
    initSelectFields();
    initMobileMenuOutsideClose();
    const aboutSection = document.querySelector(".about");

    if (!aboutSection) {
        return;
    }

    const counters = aboutSection.querySelectorAll(".about__counter");
    const aboutVideo = aboutSection.querySelector(".about__video");
    let hasAnimatedCounters = false;

    const formatCounterValue = (value, decimals) => {
        if (decimals > 0) {
            return value.toFixed(decimals);
        }

        return Math.round(value).toString();
    };

    const animateCounters = () => {
        if (hasAnimatedCounters) {
            return;
        }

        hasAnimatedCounters = true;

        counters.forEach((counter) => {
            const target = parseFloat(counter.dataset.target || "0");
            const decimals = parseInt(counter.dataset.decimals || "0", 10);
            const duration = 1800;
            const startTime = performance.now();

            const updateCounter = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = target * easedProgress;

                counter.textContent = formatCounterValue(currentValue, decimals);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = formatCounterValue(target, decimals);
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const handleVideoPlayback = (shouldPlay) => {
        if (!aboutVideo) {
            return;
        }

        if (shouldPlay) {
            const playPromise = aboutVideo.play();

            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {
                    // Ignore autoplay blocking and keep the page functional.
                });
            }
        } else {
            aboutVideo.pause();
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounters();
                handleVideoPlayback(true);
            } else {
                handleVideoPlayback(false);
            }
        });
    }, {
        threshold: 0.4
    });

    observer.observe(aboutSection);
});
























$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $(".header").addClass("scrolled");
    } else {
        $(".header").removeClass("scrolled");
    }
});






