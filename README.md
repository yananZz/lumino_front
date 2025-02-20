# 屏幕常亮工具

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📝 简介

一个优雅的屏幕常亮工具，集成了 Bing 每日壁纸作为动态背景。采用自适应设计，根据网络状况和设备屏幕自动调整壁纸质量。

## ✨ 特性

### 核心功能
- 🔆 一键开启屏幕常亮
- 🖼️ 自动加载 Bing 每日壁纸
- 🌐 智能网络适配
- 📱 响应式设计

### 技术特点
- 🎨 玻璃态设计风格
- 🔄 每24小时自动更新壁纸
- 📊 网络状况自适应
- 🖥️ 多分辨率支持

## 🛠️ 技术栈

- **React 18** - 用户界面构建
- **Vite 4** - 开发和构建工具
- **GitHub Actions** - 自动部署

## 📦 安装使用

### 在线使用
访问：[https://your-username.github.io/lumino_front/](https://your-username.github.io/lumino_front/)

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/lumino_front.git

# 进入项目目录
cd lumino_front

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🏗️ 项目结构

```
src/
├── components/
│   ├── DynamicBackground/     # 动态背景组件
│   │   ├── index.jsx         # 组件逻辑
│   │   └── style.css        # 组件样式
│   └── ScreenKeepAwake/      # 屏幕常亮组件
│       ├── index.jsx         # 组件逻辑
│       └── style.css        # 组件样式
├── styles/
│   └── index.css            # 全局样式
├── App.jsx                  # 主应用组件
└── main.jsx                # 入口文件
```

## 🔧 核心功能说明

### 屏幕常亮
- 通过定期更新页面标题保持屏幕活跃
- 优雅的开关按钮控制
- 自动恢复原始标题

### 动态壁纸
- 自动获取 Bing 每日壁纸
- 多级图片质量（根据网络状况）：
  - 4G网络：3840x2160
  - 3G网络：1920x1080
  - 其他：1280x720
- 备用图片源自动切换
- 窗口大小变化自适应

## 🚀 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages：
- 推送到 master 分支自动触发部署
- 自动构建和优化
- 自动发布到 GitHub Pages

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
