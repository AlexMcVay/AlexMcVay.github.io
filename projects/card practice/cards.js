window.addEventListener("DOMContentLoaded", (event) => {
    var cardTag = document.querySelectorAll(".job-card__tags li");
    var filterTagClose = document.querySelectorAll("#filter-tags-list li span");
  
    for (var i = 0; i < cardTag.length; i++) {
      cardTag[i].addEventListener("click", tagClicked(i));
    }
  
    for (var i = 0; i < filterTagClose.length; i++) {
      filterTagClose[i].addEventListener("click", closeClicked(i));
    }
  
    refreshList();
  
    //When a card tag is clicked
    function tagClicked(i) {
      //Get tag value
      var cardText = cardTag[i].innerHTML;
  
      //Create filter tag
      var newTag = document.createElement("li");
      newTag.innerHTML =
        "<p>" + cardText + '</p><span class="close-span">×</span>';
  
      return function () {
        //check if tag already exits
        var toAdd = true;
        var filterListing = document.querySelectorAll("#filter-tags-list li p");
        for (var keyValue = 0; keyValue < filterListing.length; keyValue++) {
          if (cardText == filterListing[keyValue].innerHTML) {
            toAdd = false;
          }
        }
  
        //Append filter tag to the list
        if (toAdd) {
          document.getElementById("filter-tags-list").appendChild(newTag);
        }
        refreshList();
      };
    }
  
    //When filter tag close is clicked
    function closeClicked(i) {
      return function () {
        filterTagClose[i].parentNode.remove();
        refreshList();
      };
    }
  
    //Clear all filter tags
    document
      .getElementById("js-clear-tags")
      .addEventListener("click", function () {
        document.getElementById("filter-tags-list").innerHTML = "";
        refreshList();
      });
  
    //Function to reload list of jobs
    function refreshList() {
      //Refresh the filter list
      filterTagClose = document.querySelectorAll("#filter-tags-list li span");
      var fiterC = document.getElementById("filter-tags-list").parentNode;
  
      for (var i = 0; i < filterTagClose.length; i++) {
        filterTagClose[i].addEventListener("click", closeClicked(i));
      }
  
      //List Sorting
      var jobListing = document.querySelectorAll("#job-list>li");
      var filterListing = document.querySelectorAll("#filter-tags-list li p");
      var matches = 0;
  
      for (var job = 0; job < jobListing.length; job++) {
        var skillSet = jobListing[job].querySelectorAll(".job-card__tags li");
        matches = 0;
  
        for (var keyValue = 0; keyValue < filterListing.length; keyValue++) {
          for (var skill = 0; skill < skillSet.length; skill++) {
            if (skillSet[skill].innerHTML == filterListing[keyValue].innerHTML) {
              matches += 1;
            }
          }
        }
        if (matches == filterListing.length) {
          jobListing[job].classList.remove("d-none");
        } else {
          jobListing[job].classList.add("d-none");
        }
      }
  
      //Check if tags are present
      if (document.querySelectorAll("#filter-tags-list li").length) {
        fiterC.classList.remove("d-none");
      } else {
        fiterC.classList.add("d-none");
        for (var i = 0; i < jobListing.length; i++) {
          jobListing[i].classList.remove("d-none");
        }
      }
    }
  });
  