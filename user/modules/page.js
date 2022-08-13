const page = `
	<section id="wrapper">
		<header class="site-header">
			<div class="container-fluid">
				<nav class="navbar site-navigation">
					<div class="navbar-brand">
						<a href="#">
							<img src="asset/img/logo.svg" alt="Logo">
						</a>
					</div>

					<div class="search-dv">
						<form action="" name="search-form" id="search_form">
							<button type="submit">
								<img src="asset/img/search-icon.png" alt="Search">
							</button>
							<input autocomplete="off" spellcheck="false" type="text" name="search" id="search" placeholder="Search">
						</form>
						<span class="ic-dv arrow-ic">
							<a href="#">
								<img src="asset/img/up-dwn-arr.png" alt="Icon">
							</a>
						</span>
					</div>
					
					<ul class="navbar-nav">
						<li id="home">
							<a href="#">
								<span class="txt">Home</span>
							</a>
						</li>
						<li id="inbox">
							<a href="#">
								<span class="icon">
									<img src="asset/img/mail.png" alt="Inbox" class="iconBlack"/>
									<img src="asset/img/mail-white.png" alt="Inbox" class="iconBlue"/>
								</span>
								<span class="txt">Inbox</span>
							</a>
						</li>
						<li id="history">
							<a href="#">
								<span class="icon">
									<img src="asset/img/share-clock.png" alt="History" class="iconBlack"/>
									<img src="asset/img/share-clock-blue.png" alt="History" class="iconBlue"/>
								</span>
								<span class="txt">History</span>
							</a>
						</li>
						<li id="logout">
							<a href="#">
								<span class="icon"><img src="asset/img/logout.png" alt="LogOut"></span>
							</a>
						</li>
					</ul>
				</nav>
			</div><!-- container -->
		</header>


		<main class="site-main">
			<section class="common-sec user-backup-sec">
				<div class="container-fluid">

					<div class="user-backup-table-wrapp">
						<table class="custom-table">
													
						</table>
					</div>

				</div><!-- container -->
			</section><!-- common-sec -->
		</main>
		
	<div style="display: ;" id="loading">
	  <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
	</section><!-- wrapper -->
`;

export { page };