# 漫画 · 第 64 话 cascade layers 与 @scope 的工程用法

> 对应正文：[docs/architecture/02-cascade-layers-scope.md](../../docs/architecture/02-cascade-layers-scope.md) ｜ 原画：[EP.64-cascade-layers-scope.svg](./EP.64-cascade-layers-scope.svg)

## 登场角色

- **标签君**：结构师。本话他接手一套「覆盖按钮要写四层选择器」的中台项目。
- **像素酱**：CSS 造型师。她习惯用更长选择器和 `!important` 解决问题，被层顺序上了一课。

## 剧情梗概

项目同时引入 UI 库、业务组件和全局样式。为了改一个按钮颜色，代码里写着 `.page .card .button.button--primary`，仍偶尔被库里的 `!important` 压住。标签君声明四层 `reset, vendor, components, utilities`，把库放进 vendor 层，用 `@scope` 限定页面级覆盖。覆盖特异性从 0-4-0 降到 0-1-0。

## 分格解读

### 格1 · 痛点现场

没有层时，优先级只有两个旋钮：特异性和源码顺序。两个团队各自加长选择器，最终形成军备竞赛。第三方库的 `!important` 更是无法用普通规则覆盖，只能继续加 `!important`。

### 格2 · 机制登场

`@layer` 把优先级变成可声明的顺序：层间先比层顺序，再比特异性；未分层样式高于所有层。三个容易踩的规则是——顺序由首次声明决定；未分层样式最高；层内 `!important` 顺序反向。`@scope` 则给选择器加边界，把样式限制在根的子树内，并在多重作用域命中时按「就近原则」胜出。

### 格3 · 落地收束

标签君把所有入口的层顺序集中声明一次，第三方库用 `@import ... layer(vendor)` 导入，业务组件进 components 层，工具类进 utilities 层，页面级覆盖用 `@scope (.page-shell)` 包住。`!important` 数量下降八成，跨路由泄漏归零。

## 码叔划重点

1. 分层后先比层顺序，再比特异性，长选择器不再是主要武器。
2. 未分层样式优先级最高，迁移时先给遗留样式加层。
3. 层内 `!important` 反向：低层的 `!important` 反而更高，这不是 bug。
4. `@scope` 不改变特异性，只加边界；多作用域命中时更近的根胜出。
5. `@scope` 兼容性仍在推进，需保留 `.card h2` 等价规则兜底。

## 自测一题

**问**：已经用了 `@layer`，为什么线上仍有一部分样式覆盖不掉？

**答**：先检查这些规则是否「未分层」。未分层样式优先级高于所有分层样式，所以遗留全局样式会压过层内规则。迁移期应先把它们收编进某个层，层顺序才会真正生效。另一个检查点是层内 `!important`——它的顺序与普通声明相反，低层反而更高。

## 动手实验

- 在示例中拖动层顺序，观察同一个按钮的最终颜色翻转：[examples/architecture/02-cascade-layers-scope](../../examples/architecture/02-cascade-layers-scope)
- 切换 `@scope` 开关，对比卡片内标题是否被外部规则污染。

## 下一话预告

第 65 话《主题与明暗体系的构建》——明暗不是再写一套颜色，而是一套语义映射加一个切换契约。
