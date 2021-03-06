(function(){
	var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update});
	var platforms,player,keys,stars,globSndStar,txtScore,score = 0;
	var keyW,keyA,keyD;
	var sprite;	
	var isPlayerDead;
	
	function preload(){
		game.load.image('sky','assets/img/sky.png');
		game.load.image('diamond','assets/img/diamond.png');
		game.load.image('platform','assets/img/platform.png');
		game.load.image('star','assets/img/hs.png');
		game.load.spritesheet('ms', 'assets/img/metalslug_mummy37x45.png', 37, 45, 18);
		
		//Carrega o arquivo de áudio
		game.load.audio('backtracking','assets/audio/Scyphe-Goldrunner_(Maccie_Pimp_Me Up_Remix).mp3');
		
		game.load.spritesheet('dude','assets/img/laizaSprite.png',40,48,15);
	}
	
	function create(){
		//Associa o áudio à sua variável
		backtrackingSound = game.add.audio('backtracking');
		backtrackingSound.play();
	
		keys = game.input.keyboard.createCursorKeys();
		
		keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
		keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
		keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0,0,'sky');
		
		platforms = game.add.group();
		platforms.enableBody = true;
		
		var platform = platforms.create(0,game.world.height - 64,'platform');
			platform.scale.setTo(2,2);
			platform.body.immovable = true;
			
			platform = platforms.create(400,400,'platform');
			platform.body.immovable = true;
			
			platform = platforms.create(-150,250,'platform');
			platform.body.immovable = true;
			
		stars = game.add.group();
		stars.enableBody = true;
		
		
		
		for(var i = 0; i < 12; i++){
			var star = stars.create(i*70,0,'star');
			star.body.gravity.y = 300;
			star.body.bounce.y = 0.7 + (Math.random()*0.2);
		}
		// NPC's 
		sprite = game.add.sprite(50, game.world.height - 110, 'ms');
		game.physics.arcade.enable(sprite);		
		sprite.animations.add('walk');sprite
		sprite.animations.play('walk', 50, true);
		sprite.body.collideWorldBounds = true;	
		game.add.tween(sprite).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true).to({ x:0 }, 10000, Phaser.Easing.Linear.None, true).loop();
		
		//Player
		player = game.add.sprite(10, game.world.height - 150,'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 300;
		player.body.bounce.y = 0.2;
		player.body.collideWorldBounds = true;
		player.animations.add('left',[0,1,2,3,4],10,true);
		player.animations.add('right',[11,12,13,14,15],10,true);
		isPlayerDead = false;
		txtScore = game.add.text(16,16,'SCORE: 0',{fontSize:'32px',fill:'#fff'});
	}
	
	function update(){
		game.physics.arcade.collide(player,platforms);
		game.physics.arcade.collide(stars,platforms);
		game.physics.arcade.overlap(player,stars,collectStar);
		game.physics.arcade.overlap(player, sprite, killSprite);

		/*
			Beging Player updates
		*/

		player.body.velocity.x = 0;
		if(keys.left.isDown || keyA.isDown){
			player.body.velocity.x = -150;
			player.animations.play('left');
		} else
		if(keys.right.isDown || keyD.isDown){
			player.body.velocity.x = 150;
			player.animations.play('right');
		} else {
			player.animations.stop();
			player.frame = 9;
		}
		
		if((keys.up.isDown || keyW.isDown) && player.body.touching.down){
			player.body.velocity.y = -300;
		}

		/* 
			End Player updates 
		*/
	}
	
	function collectStar(player,star){
		
		star.kill();
		score += 10;
		txtScore.text = 'SCORE: ' + score;
	}

	function killSprite(player,sprite){
		player.kill();
		isPlayerDead = true;
	}
}());




































