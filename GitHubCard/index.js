

axios
    .get("https://api.github.com/users/viewgo")
    .then(response => {
        console.log(response);
        const cards = document.querySelector(".cards");
        
        cards.appendChild(CardMaker(response.data, true));
        return response.data.followers_url;
    })

    .then(response => {
        axios
          .get(`${response}`)
          .then(response => {
            // console.log(response);
            const cards = document.querySelector(".cards");
            response.data.forEach(element => {
                // console.log(element);
                axios
                  .get(`${element.url}`)
                  .then(response => {
                    // console.log(response);
                    cards.appendChild(CardMaker(response.data, true));
                });
            });
        });
    })
    .catch(error => {
        console.log("The data was not returned", error);
    });

    /*
    <cards>
        <card>
            <holder>
                <img>
                <cardInfo>
            <span>
            <calendar>

            */

function CardMaker(data, useCalendar) {
    const 
        card = document.createElement("div"),
        holderDiv = document.createElement("div"),
        button = document.createElement("div"),
        calendarDiv = document.createElement("div"),
        img = document.createElement("img"),
        cardInfo = document.createElement("div"),
        name = document.createElement("h3"),
        username = document.createElement("p"),
        location = document.createElement("p"),
        profile = document.createElement("p"),
        a = document.createElement("a"),
        followers = document.createElement("p"),
        following = document.createElement("p"),
        bio = document.createElement("p");

    card.classList.add("card");
    holderDiv.classList.add("holder");
    button.classList.add("expand-button");
    calendarDiv.classList.add("calendar");
    calendarDiv.classList.add("calendar-hidden");
    cardInfo.classList.add("card-info");
    name.classList.add("name");
    username.classList.add("username");

    card.appendChild(holderDiv);
    card.appendChild(button);
    card.appendChild(calendarDiv);

    holderDiv.appendChild(img);
    holderDiv.appendChild(cardInfo);

    cardInfo.appendChild(name);
    cardInfo.appendChild(username);
    cardInfo.appendChild(location);
    cardInfo.appendChild(profile);
    cardInfo.appendChild(followers);
    cardInfo.appendChild(following);
    cardInfo.appendChild(bio);

    const buttonText1 = "Show Contributions";
    const buttonText2 = "Hide Contributions";
    button.textContent = buttonText1;

    img.src = data.avatar_url;

    (data.login !== null) ? name.textContent = data.name : name.style.display = "none";
    username.textContent = data.login;
    (data.location !== null) ? location.textContent = "Location: " + data.location : location.style.display = "none";
    profile.textContent = "Profile: ";
    a.href = data.html_url;
    a.target = "_blank";
    a.textContent = data.html_url;
    followers.textContent = "Followers: " + data.followers;
    following.textContent = "Following: " + data.following;
    (data.bio !== null) ? bio.textContent = "Bio: " + data.bio : bio.style.display = "none";

    button.addEventListener("click", event =>{
        calendarDiv.classList.toggle("calendar-hidden")
        
        if(button.textContent === buttonText1){
            button.textContent = buttonText2;
        }
        else{
            button.textContent = buttonText1;
        }
    });

    profile.appendChild(a);

    if(useCalendar){
        const calendar = document.createElement("div");
        const calImg = document.createElement("img");
        calendar.appendChild(calImg);
        calendarDiv.appendChild(calendar);

        calImg.src = `http://ghchart.rshah.org/${data.login}`;
        calImg.style.width = "100%";
    }
    else{
        calendarDiv.style.display = "none";
    }

    return card;
}
