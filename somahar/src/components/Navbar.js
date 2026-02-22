.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
}

.navbar-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: #1877f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  font-weight: 700;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #1877f2;
}

.navbar-center {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 48px;
  border-radius: 8px;
  color: #65676b;
  text-decoration: none;
  transition: background 0.2s;
  position: relative;
}

.nav-icon-btn:hover {
  background: #f0f2f5;
  color: #1877f2;
}

.nav-icon-btn.active {
  color: #1877f2;
  border-bottom: 3px solid #1877f2;
  border-radius: 0;
}

.navbar-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.navbar-action-btn {
  width: 40px;
  height: 40px;
  background: #e4e6eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #050505;
  text-decoration: none;
  transition: background 0.2s;
}

.navbar-action-btn:hover {
  background: #d8dadf;
}

.navbar-profile {
  position: relative;
  cursor: pointer;
}

.profile-avatar-sm {
  width: 40px;
  height: 40px;
  background: #1877f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.profile-dropdown {
  position: absolute;
  top: 48px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  min-width: 220px;
  padding: 8px;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;
  color: #050505;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  border: none;
  background: none;
  font-size: 14px;
}

.dropdown-item:hover {
  background: #f0f2f5;
}

.dropdown-name {
  font-weight: 600;
  font-size: 15px;
}

.dropdown-sub {
  font-size: 13px;
  color: #65676b;
}

.dropdown-divider {
  height: 1px;
  background: #e4e6eb;
  margin: 8px 0;
}

.dropdown-icon {
  width: 36px;
  height: 36px;
  background: #e4e6eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.logout-btn {
  color: #050505;
}

@media (max-width: 768px) {
  .logo-text { display: none; }
  .nav-icon-btn { width: 60px; }
  .navbar-center { gap: 0; }
}
