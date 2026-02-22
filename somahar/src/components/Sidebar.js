.sidebar {
  position: sticky;
  top: 72px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #050505;
  font-size: 15px;
  font-weight: 500;
  transition: background 0.2s;
}

.sidebar-item:hover {
  background: #f0f2f5;
}

.sidebar-item.active {
  background: #e7f3ff;
  color: #1877f2;
}

.sidebar-icon {
  width: 36px;
  height: 36px;
  background: #e4e6eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.sidebar-item.active .sidebar-icon {
  background: #cce0ff;
}

.sidebar-label {
  flex: 1;
}

@media (max-width: 1100px) {
  .sidebar-label { display: none; }
  .sidebar-item { justify-content: center; }
}
