
    
    const currentUserid = 1
    const meallist = document.querySelector('div#meallist')
    const workoutlist = document.querySelector('div#workoutlist')
    const breakfastlist = document.querySelector('div#breakfast')
    const area = document.querySelector('div#area')
    let zone = document.querySelector('#meals').value
    let getResultsButton = document.querySelector('#getresult')
    let results = document.querySelector('#results')

    const addMealBtn = document.getElementById('new-meal-btn')
    let addMeal = false
    const mealForm = document.querySelector('.container')

    let allMeals = []
    let allWorkouts = []
    let totalintake = 0
    let totalburn = 0
    

    getMeals()
    getWorkouts()
    
    setTimeout(function(){ 
        
        getolddata()
        getOldWorkout()
    
    }, 300);




    
    getResultsButton.addEventListener('click',function(event){
        totalintake = 0
        totalburn = 0
        totalCalories()
        totalWorkout()

        setTimeout(function(){ 
            
            let newDiv = document.createElement('div')

            newDiv.innerHTML = `
                <p>Your total Intake for the day is ${totalintake}</p>
                <p>Your total amount of burned calories for the day is ${totalburn}</p>
                <p>your goal for the day is 2400</p>


            `
            results.appendChild(newDiv)

        
        }, 300);

    })


    


    meallist.addEventListener('click',function(event){
        if(event.target.className==='mealcart'){
            let zone = document.querySelector('#meals')

            let dest = document.querySelector(`div#${zone.value}`)
            

            let user_meal = {
                user_id: currentUserid,
                meal_id: event.target.dataset.mealid,
                typeofmeal: zone.value
            }
            let reqObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(user_meal)
            }
            
            
            fetch('http://localhost:3000/api/v1/user_meals', reqObj)
            .then(resp => resp.json())
            .then(function(data){
                
                allMeals.forEach(function(ele){
                    if(ele.id===data.meal_id){
                        
                        let div = document.createElement('div')
                        div.className='card'
                        div.innerHTML = `
                            <p class='first'>${ele.name.toUpperCase()}</p>
                            <p class='second'>${ele.calories} per Serving</p>
                            <img src='${ele.imgurl}'>
                            <br>
                            <button data-usermealid="${data.id}" class='deleteobj'>Remove</button>
                        `
                        dest.appendChild(div)



                    }
                })

            })

        }

    })


    workoutlist.addEventListener('click',function(event){
        if(event.target.className==='userworkout'){

            let zone = document.querySelector('#workout')
            
            let user_workout = {
                user_id: currentUserid,
                workout_id: event.target.dataset.workoutid,
            }

            let reqObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(user_workout)
            }

            fetch('http://localhost:3000/api/v1/user_workouts', reqObj)
            .then(resp => resp.json())
            .then(function(data){
                
                allWorkouts.forEach(function(ele){
                    if(ele.id===data.workout_id){
                        
                        let div = document.createElement('div')
                        div.className='card'
                        div.innerHTML = `
                            <p class='first'>${ele.name.toUpperCase()}</p>
                            <p class='second'>${ele.calories} per Hour</p>
                            <img src='${ele.imgurl}'>
                            <br>
                            <button data-userworkid="${data.id}" class='deleteobjwork'>Remove</button>
                            `
                        zone.appendChild(div)



                    }
                })

            })




            
        
        }

    })

    addMealBtn.addEventListener('click', () => {
        addMeal = !addMeal
        if(addMeal){
            mealForm.style.display = 'block'
            mealForm.addEventListener('submit', event => {
                event.preventDefault()
                postMeal(event.target)
                event.target.reset()
            })
        } else {
            mealForm.style.display = 'none'
        }
    })

    function postMeal(meal_data){
        fetch('http://localhost:3000/api/v1/meals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'name': meal_data.name.value,
                'calories': meal_data.calories.value,
                'imgurl': meal_data.image.value
            })
        })
        .then(resp => resp.json())
        .then((obj_meal) => {
            let zone = document.querySelector('#meals')
            let div = document.createElement('div')
            div.className='card'
            div.innerHTML = `
                <p class='first'>${obj_meal.name.toUpperCase()}</p>
                <p class='second'>${obj_meal.calories} per Hour</p>
                <img src='${obj_meal.imgurl}'>
                <br>
                <button data-userworkid="${obj_meal.id}" class='deleteobjwork'>Remove</button>
                `
            zone.appendChild(div)
        })

    }





    area.addEventListener('click',function(event){
        
        if(event.target.className==='deleteobj'){


            fetch('http://localhost:3000/api/v1/user_meals' + "/" + event.target.dataset.usermealid, {method: "DELETE"})

            .then(response => response.json())

            .then(result => {

                event.target.parentNode.remove()

            })

        }
        if(event.target.className==='deleteobjwork'){

            fetch('http://localhost:3000/api/v1/user_workouts' + "/" + event.target.dataset.userworkid, {method: "DELETE"})

            .then(response => response.json())

            .then(result => {

                event.target.parentNode.remove()

            })

        }



        
    })







    function getolddata(){
        fetch('http://localhost:3000/api/v1/user_meals')
        .then(resp => resp.json())
        .then(function(obj){


           obj.forEach(function(ele){

                allMeals.forEach(function(meal){
                        

                    if(ele.meal_id===meal.id){

                        let dest = document.querySelector(`div#${ele.typeofmeal}`)
                        let div = document.createElement('div')
                         div.className='card'
                         div.innerHTML = `
                             <p class='first'>${meal.name.toUpperCase()}</p>
                             <p class='second'>${meal.calories} Calories per Serving</p>
                             <img src='${meal.imgurl}'>
                             <br>
                             <button data-usermealid="${ele.id}" class='deleteobj'>Remove</button>
                             `
                        
                         dest.appendChild(div)
                         console.log('third')

                        
                        


                    }
                    
                })

           })           
    
        })
    }

    function getMeals(){

        fetch('http://localhost:3000/api/v1/meals')
        .then(resp => resp.json())
        .then(function(obj){
            let list = document.querySelector('div#meallist')
            let ul = document.createElement('ul')
           // input.innerHTML = obj[0].name
           obj.forEach(function(ele){
            allMeals.push(ele)
            let li = document.createElement('li')
            li.innerHTML =  `
                <p class='name'>${ele.name.toUpperCase()} </p>
                <p class='calories'>${ele.calories} Calories per Serving</p>
                <button data-mealid="${ele.id}" class='mealcart'>Add To Cart</button>
                
            `  
            ul.appendChild(li)
           })
           list.appendChild(ul)

           console.log('first')

           
    
        })
    
    
    }
    
    function getWorkouts(){
        fetch('http://localhost:3000/api/v1/workouts')
        .then(resp => resp.json())
        .then(function(obj){
            let list = document.querySelector('div#workoutlist')
            let ul = document.createElement('ul')
           // input.innerHTML = obj[0].name
           obj.forEach(function(ele){
            allWorkouts.push(ele)
            let li = document.createElement('li')
            li.innerHTML =  `
                <p class='name'>${ele.name.toUpperCase()} </p>
                <p class='calories'>${ele.calories} Calories per Hour</p>
                <button data-workoutid="${ele.id}" class="userworkout">Add To Cart</button>
                
            `  
            ul.appendChild(li)
           })
           list.appendChild(ul)
           console.log('second')
           
    
        }) 
        
    }
    
    function getOldWorkout(){

        fetch('http://localhost:3000/api/v1/user_workouts')
        .then(resp => resp.json())
        .then(function(obj){


           obj.forEach(function(ele){

                allWorkouts.forEach(function(workout){
                        

                    if(ele.workout_id===workout.id){

                        let zone = document.querySelector('#workout')
                        let div = document.createElement('div')
                         div.className='card'
                         div.innerHTML = `
                             <p class='first'>${workout.name.toUpperCase()}</p>
                             <p class='second'>${workout.calories} Calories per Hour</p>
                             <img src='${workout.imgurl}'>
                             <br>
                             <button data-userworkid="${ele.id}" class='deleteobjwork'>Remove</button>
                             `
                        
                         zone.appendChild(div)
                         console.log('fourth')

                        
                        


                    }
                    
                })

           })           
    
        })


    }

    function totalCalories(){
        
        fetch('http://localhost:3000/api/v1/user_meals')
        .then(resp => resp.json())
        .then(function(data){

            
            data.forEach(function(ele){

                allMeals.forEach(function(meal){
                        

                    if(ele.meal_id===meal.id){
    
                        totalintake += parseInt(meal.calories)
                          
    
    
                    }
                    
                })

            })


        })

        
    }

    function totalWorkout(){
        fetch('http://localhost:3000/api/v1/user_workouts')
        .then(resp => resp.json())
        .then(function(data){

            
            data.forEach(function(ele){

                allWorkouts.forEach(function(workout){
                        

                    if(ele.workout_id===workout.id){
    
                        totalburn += parseInt(workout.calories)
                          
    
    
                    }
                    
                })

            })


        })

    }
    
    




