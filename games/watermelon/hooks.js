var gradle = { log: function(val){val && console.log( gradle.isMobile && (typeof val === 'object') ? JSON.stringify(val) : val );},
/**
	GRADLE - KNOWLEDGE IS POWER
	***** JACOB SERVICES LLC ***
    ***** PROPRIETARY CODE *****
    @author : gradle (gradlecode@outlook.com)
	@date: 12/21/2022 20:43:00
	@version: 8.0.0
	copyright @2022
*/
	
	intervalAds    : 1,     //Ads each interval for example each 3 times
	fullsize : true,
	
	//game settings :
	text_title 	: "SNAKE VS BLOCKS",
	text_over	: "GAME OVER",
	text_pts	: "PTS",
	speed 		: 6		, //snake speed
	
	//Events manager :
	//================
    event: function(ev, msg){
		if(gradle.process(ev,msg))
        switch(ev){

		case 'first_start':   //First start
			//gradle.showInter();
			break;
		
		case 'btn_play': //Button play (on start screen)
			//gradle.showInter();
			break;
			
		case 'btn_replay':
			gradle.checkInterval() && gradle.showInter();
			break;
			
		case 'showReward':
			gradle.showReward();
			break;
			
		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;
		
        }
    },





    //Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
    //=========================
	start: function(){
		setTimeout(function(){gradle.event_ext('hide_splash');}, 200);
    },
	pause: function(){
		console.log('gradle pause ...');
		if(soundOn){
			createjs.Sound.setMute(true);
		}
    },
	resume: function(){
		console.log('gradle resume ...');
		if(soundOn){
			createjs.Sound.setMute(false);
			//playSoundLoop("musicMain");
		}
    },

    run: function() {
        gradle.event('first_start');
		gradle.isMobile = ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) );
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		gradle.start();
    },

	mute: false,
    event_ext: function(val){
		if(this.isMobile && typeof jacob!='undefined'){
			jacob.do_event(val);
		}
	},

	old_ev: null,
    process: function(ev, msg){
		if(gradle.old_ev ==ev){
			if(ev=='button_share' || ev=='button_play'){
				console.log('repeat');
				//return false;
			}
		}
        if(ev=='state_game_create'){
			null != game && (game.sound.mute = !1, game.paused = !1);
			//this.triggerEvent(document.getElementById('game'), 'click');
		}
		switch(ev){
            case 'btn_more':
                gradle.event_ext('show_more');
                break;
            case 'btn_privacy':
                gradle.event_ext('show_privacy');
                break;
            case 'btn_share':
                gradle.event_ext('show_share');
                break;
            case 'btn_profile':
                gradle.event_ext('show_profile');
                break;
            case 'btn_exit_game':
                gradle.event_ext('exit_game');
                break;
            case 'btn_review':
                gradle.event_ext('show_review');
                break;
        }
		gradle.old_ev = ev;
		gradle.log(ev,msg);
		return true;
    },

    showInter: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_inter');
    },
    showReward: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_reward');
    },

    is_reward:false,
    reward_callback: function(){
        gradle.log('reward callback.... org');
    },
	reward: function(state){
        gradle.log('>>>>>>>>>>>>>>>>>>> reward granted : '+ state);
        is_reward = (state=='yes');
        gradle.reward_callback();
		document.dispatchEvent(new CustomEvent('awesome', { bubbles: true, detail: { text: () => 'rewarded' } }))
    },

	score : 0,
    save_score(score, level){
        gradle.event_ext('save_score|'+score+'|'+level);
    },

	onVisibilityChanged : function(){
	    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
			gradle.pause();
		}else{
			gradle.resume();
		}
	},
	
	trackStats: function(a, b){
		gradle.event(a, b);
	},
	
	trackScreen: function(a,b){
		gradle.event(a,b);
	},
	
	trackEvent: function(a,b){
		gradle.event(a,b);
	},
	
	showAd: function(){
		gradle.event('showAd');
	},
	
	__: function(t){
		return null;//t;
	},

	currentInterval : 0,
	checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	}
};

gradle.run();
