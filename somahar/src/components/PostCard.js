.post-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  margin-bottom: 12px;
  overflow: visible;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px 0;
}

.post-avatar {
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
  text-decoration: none;
  flex-shrink: 0;
}

.post-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-author {
  font-weight: 600;
  font-size: 15px;
  color: #050505;
  text-decoration: none;
}

.post-author:hover {
  text-decoration: underline;
}

.post-time {
  font-size: 13px;
  color: #65676b;
}

.post-more {
  background: none;
  border: none;
  color: #65676b;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  transition: background 0.2s;
}

.post-more:hover {
  background: #f0f2f5;
}

.post-content {
  padding: 12px 16px;
  font-size: 15px;
  color: #050505;
  line-height: 1.5;
}

.post-counts {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
}

.reaction-counts {
  display: flex;
  gap: 4px;
  font-size: 14px;
  color: #65676b;
}

.comment-count {
  font-size: 14px;
  color: #65676b;
  cursor: pointer;
}

.comment-count:hover {
  text-decoration: underline;
}

.post-divider {
  height: 1px;
  background: #e4e6eb;
  margin: 0 16px;
}

.post-actions {
  display: flex;
  padding: 4px 8px;
}

.post-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border: none;
  background: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  color: #65676b;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}

.post-action-btn:hover {
  background: #f0f2f5;
}

.post-action-btn .reacted {
  color: #1877f2;
}

.reaction-btn {
  position: relative;
}

.reaction-picker {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 50px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  padding: 8px 12px;
  display: flex;
  gap: 8px;
  z-index: 10;
}

.reaction-picker span {
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s;
}

.reaction-picker span:hover {
  transform: scale(1.3);
}

.comments-section {
  padding: 8px 16px 12px;
}

.comment-form {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  background: #1877f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}

.comment-input-wrap {
  flex: 1;
}

.comment-input {
  width: 100%;
  background: #f0f2f5;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
}

.comment-input:focus {
  background: #e4e6eb;
}
