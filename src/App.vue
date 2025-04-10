<template>
  <div id="app">
    <div class="hamburger-menu" @click="toggleSidebar">
      <i class="fa fa-bars"></i>
    </div>

    <div class="overlay" v-if="sidebarOpen" @click="toggleSidebar"></div>

    <header>
      <div class="main-header">
        <div class="logo-container">
          <span class="logo">ClarityUI</span>
        </div>
        <div class="search-container">
          <i class="fa fa-search"></i>
          <input type="text" placeholder="Type to search" />
        </div>
        <div class="user-actions">
          <a href="#" class="notification">
            <i class="fa fa-bell"></i>
          </a>
          <a href="#" class="settings">
            <i class="fa fa-cog"></i>
          </a>
          <div class="user-profile">
            <img src="@/assets/img/user.png" alt="User Profile" />
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <aside class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
        <nav class="sidebar-nav">
          <ul>
            <li>
              <router-link to="/">
                <i class="fa fa-home"></i> Dashboard
              </router-link>
            </li>
          </ul>
          <div class="menu-section">Analytics</div>
          <ul>
            <li>
              <a href="#"><i class="fa fa-chart-bar"></i> Performance</a>
            </li>
            <li>
              <a href="#"><i class="fa fa-sun"></i> Hotjar <span class="badge new">NEW</span></a>
            </li>
          </ul>
          <div class="menu-section">Support</div>
          <ul>
            <li>
              <a href="#"><i class="fa fa-ticket-alt"></i> Tickets <span class="badge">15</span></a>
            </li>
            <li>
              <a href="#"><i class="fa fa-user-tie"></i> Agents</a>
            </li>
            <li>
              <a href="#"><i class="fa fa-users"></i> Customers</a>
            </li>
          </ul>
          <div class="menu-section">Shop</div>
          <ul>
            <li>
              <router-link to="/products" active-class="active">
                <i class="fa fa-folder-open"></i> Products
              </router-link>
            </li>
            <li>
              <a href="#"><i class="fa fa-bell"></i> Orders</a>
            </li>
            <li>
              <a href="#"><i class="fa fa-chart-line"></i> Reports</a>
            </li>
          </ul>
          <ul class="sidebar-bottom">
            <li>
              <a href="#"><i class="fa fa-cog"></i> Settings</a>
            </li>
            <li>
              <a href="#"><i class="fa fa-sign-out-alt"></i> Logout</a>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      sidebarOpen: false
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    }
  }
}
</script>

<style>
/* Estilos globais mantendo o design original */

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
#app {
  font-family: "Montserrat", sans-serif;
  height: auto;
  display: flex;
  flex-direction: column;
}

.hamburger-menu {
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 999;
  cursor: pointer;
  padding: 10px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 997;
}

.logo-container .logo {
  font-size: 24px;
  font-weight: bold;
  color: #5a5c69;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #f1f3f9;
  padding: 10px 15px;
  border-radius: 8px;
  flex: 0.5;
  max-width: 500px;
}

.search-container input {
  border: none;
  background: transparent;
  margin-left: 10px;
  outline: none;
  width: 100%;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-actions a {
  color: #5a5c69;
  font-size: 18px;
}

.user-profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.container {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
  background-color: #f7f6fe;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.sidebar-nav {
  padding: 20px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li a {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #5a5c69;
  text-decoration: none;
  transition: all 0.3s;
}

.sidebar-nav li a i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.sidebar-nav li a:hover {
  background-color: #f8f9fc;
  color: #624de3;
}


.menu-section {
  padding: 10px 20px 5px;
  font-size: 12px;
  font-weight: bold;
  color: #b7b9cc;
  text-transform: uppercase;
}

.badge {
  background-color: #624de3;
  color: white;
  border-radius: 50%;
  padding: 5px 7px;
  font-size: 12px;
  margin-left: auto;
}

.badge.new {
  background-color: #eef1ff;
  border: 1px solid #b8bffc;
  color: #625be8;
  padding: 3px 8px;
  border-radius: 10px;
}

.sidebar-bottom {
  margin-top: auto;
  border-top: 1px solid #eaecf4;
  padding-top:110px !important;
}

.main-content {
  flex: 1;
  background-color: #fff;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .hamburger-menu {
    display: block;
  }
  
  .sidebar {
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 999;
    transform: translateX(-100%);
  }
  
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
  
  .search-container {
    flex: 1;
    margin: 0 15px;
  }
}
</style>