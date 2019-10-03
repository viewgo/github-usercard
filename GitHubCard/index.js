axios
    .get("https://api.github.com/users/viewgo")
    .then(response => {
        // console.log(response);
        const cards = document.querySelector(".cards");
        cards.appendChild(CardMaker(response.data));
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
                    console.log(response);
                    cards.appendChild(CardMaker(response.data));
                });
            });
        });
    })
    .catch(error => {
        console.log("The data was not returned", error);
    });


function CardMaker(data) {
    const card = document.createElement("div"),
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
    cardInfo.classList.add("card-info");
    name.classList.add("name");
    username.classList.add("username");

    card.appendChild(img);
    card.appendChild(cardInfo);

    cardInfo.appendChild(name);
    cardInfo.appendChild(username);
    cardInfo.appendChild(location);
    cardInfo.appendChild(profile);
    cardInfo.appendChild(followers);
    cardInfo.appendChild(following);
    cardInfo.appendChild(bio);

    img.src = data.avatar_url;
    name.textContent = data.name;
    username.textContent = data.login;
    location.textContent = "Location: " + data.location;
    profile.textContent = "Profile: ";
    a.href = data.html_url;
    a.target = "_blank";
    a.textContent = data.html_url;
    followers.textContent = "Followers: " + data.followers;
    following.textContent = "Following: " + data.following;
    bio.textContent = "Bio: " + data.bio;

    profile.appendChild(a);

    return card;
}
