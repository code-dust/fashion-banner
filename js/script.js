$(document).ready(function(){
/*Hamburger menu functionality*/	
$('.ham-menu').click(function(){
		$('.ham-menu').removeClass('active');
		$('.ham-menu_close').addClass('active');
		$('.menu').addClass('active');
	})
$('.ham-menu_close').click(function(){
		$('.ham-menu_close').removeClass('active');
		$('.ham-menu').addClass('active');
		$('.menu').removeClass('active');
	})

	
/*Set Slide Item width*/
$('.slide-item').width($('.center').innerWidth());
$('.slide-item').height($('.center').innerHeight());
	
		
	
/*MAIN SLIDER*/	
const sliderSlides = document.querySelector('.slider-slides');
let slideItem = document.querySelectorAll('.slider-slides .slide-item');

//boolean to check when we are on the first or last slide : used by the slider dots
var currentSlideIsfirstSlide=true;
var currentSlideIslastSlide=false;

//clones
const firstClone = slideItem[0].cloneNode(true);
const lastClone = slideItem[slideItem.length-1].cloneNode(true);

firstClone.classList.add('firstClone');
lastClone.classList.add('lastClone');

sliderSlides.append(firstClone);
sliderSlides.prepend(lastClone);

//useful variables
slideItem = document.querySelectorAll('.slider-slides .slide-item');//notice we selected all slides again because we just created new clones 
const indexOfFirstSlideClone=slideItem.length -1;
const indexOfLastSlideClone=0;
const virtualIndexOfFirstSliderDot=1;
const virtualIndexOfLastSliderDot=slideItem.length -2;

//Btns
const prevBtn = document.querySelector('.slide-prevBtn');
const nextBtn = document.querySelector('.slide-nextBtn');


//number of slide-items
let numberOfSlideItems = sliderSlides.childElementCount;


//counter
let counter = 1;

//slide-item width percentage
var slideItemWidthPercent = (1/numberOfSlideItems)*100;



//starting point of the slider 
sliderSlides.style.transform = 'translateX(' + (-slideItemWidthPercent * counter) + '%';//5:08pm 6/12/2021 The reason percentage adjusts the translateX property responsively is because percentage is a variable property hence the browser always checks to update any element with a percentage property as the windows is changed. for example ; width : 100px : gives a definite contant width while ; width : 100% : gives a variable width that adjusts as the window size changes
	
	
//prevBtn and nextBtn functions
const moveToNextSlide=()=>{
	slideItem = document.querySelectorAll('.slider-slides .slide-item');
	if( counter >= slideItem.length -1 )return;
	var slideItemWidthPercent = (1/numberOfSlideItems)*100;
	sliderSlides.style.transition = 'all 0.45s linear';
	counter++;
	sliderSlides.style.transform = 'translateX(' + (-slideItemWidthPercent * counter) + '%';
	
}

nextBtn.addEventListener('click',()=>{
	moveToNextSlide();
});


const moveToPrevSlide=()=>{
	slideItem = document.querySelectorAll('.slider-slides .slide-item');
	if(counter <=0 )return;
	var slideItemWidthPercent = (1/numberOfSlideItems)*100;
	sliderSlides.style.transition = 'all 0.45s linear';
	counter--;
	sliderSlides.style.transform = 'translateX(' + (-slideItemWidthPercent * counter) + '%';
	
}

prevBtn.addEventListener('click',()=>{
	moveToPrevSlide();
});
	

	
	
//listen for transitioning effect and do something
sliderSlides.addEventListener('transitionend',()=>{
	//infinite transition
	
	slideItem = document.querySelectorAll('.slider-slides .slide-item');
	//infinite transition
	const cloneTransition = () =>{
	   if (slideItem[counter].classList.contains('lastClone')){
		sliderSlides.style.transition = 'none';
		counter=slideItem.length -2;
		sliderSlides.style.transform = 'translateX(' + (-slideItemWidthPercent * counter) + '%';
		
		
	   } 	
	
	   if (slideItem[counter].classList.contains('firstClone')){
		   sliderSlides.style.transition = 'none';
		   counter=slideItem.length - counter;
		   sliderSlides.style.transform = 'translateX(' + (-slideItemWidthPercent * counter) + '%';
		
		
	   }
    };
	cloneTransition();
	
	const firstSlideStateWatch = () =>{//watch if we are on the first slide
       if(counter==1){
	       currentSlideIsfirstSlide = true;//if yes , then set its check boolean to true
		   //console.log(currentSlideIsfirstSlide);
			}
	   else{
	       currentSlideIsfirstSlide = false;// as soon as we are no longer on the first slide set its boolean to false
		  
			}
	};
	firstSlideStateWatch();
	const lastSlideStateWatch = () =>{//same for last slide
       if(counter==5){
	       currentSlideIslastSlide = true;
		   
			}
	   else{
	       currentSlideIslastSlide = false;
		   
			}
	};
	lastSlideStateWatch();
	
});
	
	
	
	
	
//Add Slider Dots
let numberOfClones=2;
const addSliderDots=()=>{
   let slideDotsCounter=0;
   let numberOfSlideItems = sliderSlides.childElementCount;
   const sliderDots=document.querySelector('.slider-dots');	
  
   while(slideDotsCounter<numberOfSlideItems-numberOfClones){	
   	 sliderDots.innerHTML+="<div class='btn'><div class='img-btn' style='background-image:url("+"imgs/"+(slideItem[slideDotsCounter+1].getAttribute('data-imgbtn'))+".jpg');'></div><h1>"+(slideItem[slideDotsCounter+1].getAttribute('data-txt'))+"</h1></div>";
	   
		 
     slideDotsCounter++;  
   }
   
}

addSliderDots();	
	
	
	
//Slider Dots functionality
const sliderDotButton=document.querySelectorAll('.slider-dots .btn .img-btn');	
let slideDotsCounter=0;	
let numberOfSlideDots = (sliderSlides.childElementCount)-numberOfClones;	
for(let i=slideDotsCounter; i<numberOfSlideDots;i++){//i.e count from 0 to 4	
      sliderDotButton[i].addEventListener('click',()=>{//remember there are only 5 dots , with their index starting from 0 to 4
		  
	    sliderDotButton[i].parentElement.classList.add('active');//Style the button when clicked
		  
		//useful vriables  
		var sliderCurrentDotIndex=i ;//we want to know the INDEX of the current slide dot we are on so that we can ensure every other dot except it is unstyled 
		var sliderCurrentDot=sliderCurrentDotIndex+1;//this is a VIRTUAL INDEX in sense that it allows us land on slides that are not clones , using the dots we select  
		  
		for(let i=slideDotsCounter; i<numberOfSlideDots;i++){//10/12/2021 //now we want to unstyle every other button except the one we just clicked
			
			if(i!=sliderCurrentDotIndex){//if the index we are on is not that of the current sliderdot then :
			  sliderDotButton[i].parentElement.classList.remove('active');//unstyle it by removing its active class
			}
			
		};
	    const moveToSelectedSlide=()=>{//function to move to selected slide
			
	        if((sliderCurrentDot==virtualIndexOfLastSliderDot)&&(currentSlideIsfirstSlide==true)){
			        //alert(currentSlideIsfirstSlide);
				var slideItemWidthPercent = (1/numberOfSlideItems)*100;
			    sliderCurrentDotIndex=indexOfLastSlideClone;
				sliderSlides.style.transition = 'all 0.45s linear';//11:12am 12/12/2021 : Finally this was the missing piece : if theres no transition effect the ' transitioned ' event lisetener above doesnt get to detect this function and do what it should have done, there has to be a transition into the clones , even prev and nxt btns actually transition into the clones its when they trnasition to the real version of the clones that transition is set to 'none' hence 'transtitioned' doesnt detect that one. 
				sliderSlides.style.transform = 'translateX(' + (-slideItemWidthPercent * sliderCurrentDotIndex) + '%';
				counter=sliderCurrentDotIndex;
				//console.log(counter+'hey1');
			    
					
			}
			else if((sliderCurrentDot==virtualIndexOfFirstSliderDot)&&(currentSlideIslastSlide==true)){
				var slideItemWidthPercent = (1/numberOfSlideItems)*100;
			    sliderCurrentDotIndex=indexOfFirstSlideClone;
				sliderSlides.style.transition = 'all 0.45s linear';//11:12am 12/12/2021 : Finally this was the missing piece
				sliderSlides.style.transform = 'translateX(' + (-slideItemWidthPercent * sliderCurrentDotIndex) + '%';
				counter=sliderCurrentDotIndex;
				//console.log(counter+'hey2');
			}
			else{
	           var slideItemWidthPercent = (1/numberOfSlideItems)*100;
	           sliderSlides.style.transition = 'all 0.45s linear';
	           sliderSlides.style.transform = 'translateX(' + (-slideItemWidthPercent * (sliderCurrentDot)) + '%';
			   counter=sliderCurrentDot;//give the virtual index of the slider current slider dot to counter so that the autoslider , prevBtn and nextBtn can continue from there ( remember sliderCurrentDot is equal to sliderDurrentDotIndex+1 , reason being we want to avoid landing on any of the clones meaning if a select a button with index number 0, ordinarily thats the index number of a clone , hence i need to increment it so i can land on the immediate slide after the clone that is the slide with index number :0+1  ) 	
			   //console.log(counter+'hey3');	
			}
			
	    }
		moveToSelectedSlide();
		
})
}	
	
	
	
	
	
	
	

	
})


