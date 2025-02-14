

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
        const minusIcon = header.querySelector('.fa-minus'); // Updated selector to find the minus icon inside the header
        const body = accordion.querySelector('.accordion-body');
        const border = accordion.querySelector(".ds_accor-border")

        // Initially hide the minus icon since the accordion is closed by default
        minusIcon.style.display = 'none';

        // Click event for the header to toggle the accordion
        header.addEventListener('click', function () {
            const isOpen = accordion.classList.contains('open');
            
            if (isOpen) {
                // Close the accordion
                accordion.classList.remove('open');
                accordion.classList.remove('ds_accor-shadow')
                plusIcon.style.display = 'block'; // Show plus icon
                minusIcon.style.display = 'none'; // Hide minus icon
                header.classList.remove("ds_accor-question");
                header.classList.add("pb-3")

                // header.style.backgroundColor = '#2888E10D';
                // border.classList.add("d-none")
            } else {
                // Open the accordion
                accordion.classList.add('open');
                // accordion.classList.add('ds_accor-shadow')
                plusIcon.style.display = 'none'; // Hide plus icon
                minusIcon.style.display = 'block'; // Show minus icon
                header.style.backgroundColor = 'white';
                // header.classList.add("ds_accor-question");
                // border.classList.remove("d-none")
                document.getElementById("ds_accordian").style.borderRadius = "5px";
                header.classList.remove("pb-3")
                header.classList.add("pb-0")
            }
        });
    });
}


// Initialize accordion listeners
attachAccordionListeners();
// Call "All FAQs" filter by default when the page loads
handleNavTab(0);