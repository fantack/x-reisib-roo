document.addEventListener('DOMContentLoaded', function() {
    // Kirjutamise animatsioon banneril
    const text = "Tere tulemast reis X-reisi büroose";
    const typingText = document.getElementById('typing-text');
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Käivita kirjutamise animatsioon
    typeWriter();
    
    // Bänneri slaidide vahetus
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        // Praegune slide liigub vasakule välja
        slides[currentSlide].classList.add('slide-out-left');
        
        // Järgmine slide tuleb paremalt sisse
        let nextSlideIndex = (currentSlide + 1) % slides.length;
        slides[nextSlideIndex].style.transform = 'translateX(100%)';
        slides[nextSlideIndex].style.display = 'block';
        slides[nextSlideIndex].style.opacity = '1';
        
        // Väike paus, et lülitused ei kattuks
        setTimeout(() => {
            slides[nextSlideIndex].classList.add('slide-in-right');
        }, 50);
        
        // Pärast animatsiooni lõppu puhastame klassid
        setTimeout(() => {
            slides[currentSlide].classList.remove('active', 'slide-out-left');
            slides[currentSlide].style.display = 'none';
            slides[nextSlideIndex].classList.add('active');
            slides[nextSlideIndex].classList.remove('slide-in-right');
            slides[nextSlideIndex].style.transform = 'translateX(0)';
            currentSlide = nextSlideIndex;
        }, 800);
    }
    
    // Vaheta slaide iga 4 sekundi järel
    setInterval(nextSlide, 4000);
    
    // Esimese sektsiooni kaardid, mida animeerime erilisel viisil
    const section1Cards = document.querySelectorAll('#section1 .card');
    let hasAnimatedSection1 = false;
    
    // Kolmanda sektsiooni kaardid, mida animeerime alt üles
    const section3Cards = document.querySelectorAll('#section3 .card');
    let hasAnimatedSection3 = false;
    
    // Elemendid ilmuvad nähtavale scrollides
    function checkVisibility() {
        // Kontrollime, kas oleme juba alustanud kerimist ja Section 1 animatsioon pole veel toimunud
        if (window.scrollY > 100 && !hasAnimatedSection1) {
            // Animeerime sektsiooni 1 kaardid ette
            section1Cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                    
                    // Aktiveerime ka teksti fade-in animatsiooni
                    setTimeout(() => {
                        card.querySelector('.text-content').classList.add('visible');
                    }, 500);
                }, index * 300); // Väike viivitus kaartide vahel
            });
            
            // Märgime, et animatsioon on toimunud
            hasAnimatedSection1 = true;
        }
        
        // Kontrollime section3 kaarte (pildid 1.3 ja 2.3)
        const section3Distance = document.getElementById('section3').getBoundingClientRect().top;
        
        if (section3Distance < window.innerHeight * 0.8 && !hasAnimatedSection3) {
            section3Cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                    card.style.opacity = '1';
                    
                    // Aktiveerime ka teksti fade-in animatsiooni
                    setTimeout(() => {
                        card.querySelector('.text-content').classList.add('visible');
                    }, 500);
                }, index * 300);
            });
            
            hasAnimatedSection3 = true;
        }
        
        const bottomToTopElements = document.querySelectorAll('.bottom-to-top');
        const topToBottomElements = document.querySelectorAll('.top-to-bottom:not(#section3 .top-to-bottom)');
        const fadeInElements = document.querySelectorAll('.fade-in:not(#section1 .fade-in):not(#section3 .fade-in)');
        
        // Funktsioon, mis kontrollib, kas element on vaatealas
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        // Kontrolli alt-ülesse animeeritavate elementide nähtavust
        bottomToTopElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
        
        // Kontrolli ülalt-alla animeeritavate elementide nähtavust (välja arvatud section3)
        topToBottomElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
        
        // Kontrolli sissekaduva teksti nähtavust (välja arvatud esimese ja kolmanda sektsiooni tekstid)
        fadeInElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, 500);
            }
        });
    }
    
    // Kontrolli elemendite nähtavust lehe laadimisel ja kerimisel
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    // Käivita esialgne kontroll peale lehe laadimist
    setTimeout(checkVisibility, 500);
    
    // Näita esimene slaid kohe
    slides[0].classList.add('active');
    slides[0].style.display = 'block';
    slides[0].style.opacity = '1';
    slides[0].style.transform = 'translateX(0)';

    // Broneerimine Modal functionality
    const modal = document.getElementById('bookingModal');
    const bookingButton = document.getElementById('bookingButton');
    const closeButton = document.querySelector('.close');
    
    bookingButton.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Keela kerimine modali avamisel
        generateCalendar(currentYear, currentMonth);
    });
    
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Luba kerimine modali sulgemisel
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Destination dropdown functionality
    const destinationInput = document.getElementById('destination');
    const destinationDropdown = document.getElementById('destinationDropdown');
    
    destinationInput.addEventListener('focus', function() {
        destinationDropdown.style.display = 'block';
    });
    
    document.addEventListener('click', function(event) {
        if (event.target !== destinationInput && !destinationDropdown.contains(event.target)) {
            destinationDropdown.style.display = 'none';
        }
    });
    
    // Select destination from dropdown
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            destinationInput.value = this.textContent;
            destinationDropdown.style.display = 'none';
            
            // Update calendar with special prices
            generateCalendar(currentYear, currentMonth);
        });
    });
    
    // Calendar functionality
    const monthNames = [
        "Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", 
        "Juuli", "August", "September", "Oktoober", "November", "Detsember"
    ];
    
    let currentDate = new Date(2025, 3, 10);  // 10. aprill 2025 (kuu on 0-põhine)
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthText = document.getElementById('currentMonth');
    
    prevMonthBtn.addEventListener('click', function() {
        if (currentYear > 2025 || (currentYear === 2025 && currentMonth > 3)) {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentYear, currentMonth);
        }
    });
    
    nextMonthBtn.addEventListener('click', function() {
        if (currentYear < 2026 || (currentYear === 2026 && currentMonth < 3)) {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentYear, currentMonth);
        }
    });
    
    // Generate calendar
    function generateCalendar(year, month) {
        const calendarDays = document.getElementById('calendarDays');
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay() || 7; // Kohandumine esmaspäevaalgusele (1-7)
        
        currentMonthText.textContent = monthNames[month] + " " + year;
        calendarDays.innerHTML = '';
        
        // Add empty cells for days before the first day of month
        for (let i = 1; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'empty-day';
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();
            
            // Check for special pricing dates
            // Oslo Pühapäeval
            if (dayOfWeek === 0 && destinationInput.value.includes('Oslo')) {
                dayElement.classList.add('special-price');
            }
            
            // Ateena 10.04-14.04
            if (month === 3 && (day >= 10 && day <= 14) && destinationInput.value.includes('Ateena')) {
                dayElement.classList.add('special-price');
            }
            
            dayElement.addEventListener('click', function() {
                // Remove selected class from all days
                document.querySelectorAll('.days div').forEach(div => {
                    div.classList.remove('selected');
                });
                
                // Add selected class to clicked day
                this.classList.add('selected');
                
                // Show flight options
                showFlightOptions(year, month, day);
            });
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Show flight options
    function showFlightOptions(year, month, day) {
        const flightOptions = document.getElementById('flightOptions');
        const flightOptionContainer = document.getElementById('flightOptionContainer');
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        const dateString = `${day}.${month + 1}.${year}`;
        
        flightOptionContainer.innerHTML = '';
        flightOptions.style.display = 'block';
        
        // Get selected destination
        const destination = destinationInput.value;
        
        // Create flight options with prices
        const morningOption = document.createElement('div');
        morningOption.className = 'flight-option';
        
        const eveningOption = document.createElement('div');
        eveningOption.className = 'flight-option';
        
        // Determine flight duration and price based on destination
        let duration, price, specialPrice = false;
        
        if (destination.includes('Varssavi')) {
            duration = '70 minutit';
            price = 230;
        } else if (destination.includes('Oslo')) {
            duration = '60 minutit';
            price = 160;
            
            // Special price on Sundays
            if (dayOfWeek === 0) {
                price = 95;
                specialPrice = true;
            }
        } else if (destination.includes('Pariisi')) {
            duration = '130 minutit';
            price = 350;
        } else if (destination.includes('Sydney')) {
            duration = '1250 minutit';
            price = 1900;
        } else if (destination.includes('London')) {
            duration = '180 minutit';
            price = 190;
        } else if (destination.includes('Newark')) {
            duration = '630 minutit';
            price = 610;
        } else if (destination.includes('Tokyo')) {
            duration = '780 minutit';
            price = 1200;
        } else if (destination.includes('Ateena')) {
            duration = '160 minutit';
            price = 210;
            
            // Special price between 10.04-14.04.2025
            if (year === 2025 && month === 3 && (day >= 10 && day <= 14)) {
                price = 147;
                specialPrice = true;
            }
        } else if (destination.includes('Kairo')) {
            duration = '280 minutit';
            price = 570;
        }
        
        // Morning flight
        morningOption.innerHTML = `
            <div class="flight-time">11:15</div>
            <div class="flight-details">
                <div>Tallinn → ${destination.split(' ')[0]}</div>
                <div>${duration}</div>
            </div>
            <div class="flight-price">
                ${price}€
                ${specialPrice ? '<div class="special-price-tag">Soodushind!</div>' : ''}
            </div>
        `;
        
        // Evening flight
        eveningOption.innerHTML = `
            <div class="flight-time">19:30</div>
            <div class="flight-details">
                <div>Tallinn → ${destination.split(' ')[0]}</div>
                <div>${duration}</div>
            </div>
            <div class="flight-price">
                ${price}€
                ${specialPrice ? '<div class="special-price-tag">Soodushind!</div>' : ''}
            </div>
        `;
        
        flightOptionContainer.appendChild(morningOption);
        flightOptionContainer.appendChild(eveningOption);
    }
});