

function handleNavTab (a , title) {
    const id = a
    const Arr = ["ds_fre-btn" , "ds_fre-btn2" , "ds_fre-btn3" , "ds_fre-btn4" , "ds_fre-btn5" , "ds_fre-btn6" , "ds_fre-btn7" , "ds_fre-btn8"]

    Arr.forEach((element)=>{
        document.getElementById(element).classList.remove("ds_active")
    })

    document.getElementById(Arr[id]).classList.add("ds_active")

    const filters = {
        0: 'all', 
        1: 'book', 
        2: 'pay',  
        3: 'exchange',
        4:'order',
        5:'account',
        6:'customer',
        7:'privacy',
    };
    
    filterFAQs(filters[a])
    document.getElementById("ds_faq_title").innerHTML = title ? title : "General"

}


const accorId = document.getElementById("ds_accordian-data")
const accorArr = [
    {
        heading:'How do i cancel order i just placed by mistake ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'book',
        heading:'How do i cancel order i just placed by mistake ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'book',
        heading:'Lorem ipsum dolor sit amet, consectetur ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'book',
        heading:'How do i cancel order i just placed by mistake ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {  
        type:'pay',
        heading:'Lorem ipsum dolor sit amet, consectetur ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'pay',
        heading:'Lorem ipsum dolor sit amet, consectetur ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'check',
        heading:'How do i cancel order i just placed by mistake ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'exchange',
        heading:'Lorem ipsum dolor sit amet, consectetur ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'order',
        heading:'Lorem ipsum dolor sit amet, consectetur ? ',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'account',
        heading:'Lorem ipsum dolor sit amet, consectetur ? ',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'customer',
        heading:'Lorem ipsum dolor sit amet, consectetur ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
    {
        type:'privacy',
        heading:'Lorem ipsum dolor sit amet, consectetur ?',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .',
    },
]

function filterFAQs(selectedType) {
    console.log("adfqwdfqwf " , selectedType);
    
    const filteredAccorArr = accorArr.filter(element => {
        return selectedType === 'all' || element.type === selectedType;
    });

    const accorMap = filteredAccorArr.map((element) => {
        return `
           <div id="ds_accordian" class="accordion  mt-3 position-relative ">
                      <div class="accordion-header">
                          <h5 class="ds_accor-title mb-0 me-1">${element.heading}</h5>
                          <i class="fas fa-plus me-sm-3"></i>
                          <i class="fa-solid fa-minus me-sm-2 pe-1 text-dark"></i>
                      </div>

                      <div class="accordion-body ds-transition border-0" style="">
                          
                          <div class="px-3 ">
                              <p class="ds_accor-para ds_muted ds_font ">${element.text}</p>
                          </div>
                      </div>
                </div>
        `;
    }).join("");

    // Update the accordion container
    document.getElementById("ds_accordian-data").innerHTML = accorMap;

    // Attach click event listeners to accordion headers
    attachAccordionListeners();
}

function attachAccordionListeners() {
    document.querySelectorAll('.accordion').forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        const plusIcon = header.querySelector('.fa-plus');
        const minusIcon = header.querySelector('.fa-minus'); 
        const body = accordion.querySelector('.accordion-body');

        // Initially hide the minus icon since the accordion is closed by default
        minusIcon.style.display = 'none';

        header.addEventListener('click', function () {
            const isOpen = accordion.classList.contains('open');

            // Close all accordions before opening a new one
            document.querySelectorAll('.accordion').forEach(acc => {
                acc.classList.remove('open');
                acc.classList.remove('ds_accor-shadow');
                acc.querySelector('.fa-plus').style.display = 'block';
                acc.querySelector('.fa-minus').style.display = 'none';
                acc.querySelector('.accordion-header').classList.remove("ds_accor-question");
                acc.querySelector('.accordion-header').classList.add("pb-3");
            });

            if (!isOpen) {
                // Open the clicked accordion
                accordion.classList.add('open');
                plusIcon.style.display = 'none';
                minusIcon.style.display = 'block';
                header.style.backgroundColor = 'white';
                header.classList.remove("pb-3");
                header.classList.add("pb-0");
            }
        });
    });
}

// Initialize accordion listeners
attachAccordionListeners();
// Call "All FAQs" filter by default when the page loads
handleNavTab(0);