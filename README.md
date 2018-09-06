# jquery-annotate

Quick jQuery plugin that will highlight and describe selected elements on a page. This is useful mostly for taking screenshots of existing pages.

Can be injected into the inspector as a "one-liner" by copy-pasting the contents of [`oneline.js`](https://raw.githubusercontent.com/hiebj/jquery-annotate/master/oneline.js) into the console.

Subsequently, you can select and annotate various elements by selecting the targets with jQuery and running the plugin, passing options if necessary. The default annotation styles create a border and floating pills identifying the tag types of the annotated elements. When hovered, the floating pills will show additional details about the element. When clicked, the floating pills will "toggle" the details for that element, keeping it rendered on mouseout:

<img src="https://github.com/hiebj/jquery-annotate/raw/master/details.png" alt="details screenshot" width="500">

## Example
When the following is input into the console (after `oneline.js` has been injected), various sections of this github repository will be visually annotated, resulting in the screenshot below:
```
$('.repohead-details-container, .overall-summary, .file-wrap, .markdown-body').annotate({ pseudoEls: true })
```

![annotated screenshot](https://github.com/hiebj/jquery-annotate/raw/master/screenshot.png)

## API
The plugin adds two functions to the jQuery object.

**`$.fn.annotate`**  
Applies annotation styles to the selected elements. Accepts a config object with the following options:  
```
{
  /**
   * changes the text that is rendered into the pill for the given `this` element.
   * defaults to `${tagName}#${id}`
   */
  annotationRenderer: (this: jQuery) => string
  /**
   * changes the text that is rendered into the hovering "details" pane on mouseover.
   * defaults to several layout properties from getComputedStyle().
   * an easy alternative would be `JSON.stringify(window.getComputedStyle(this), null, 2)`.
   * note that because I didn't use portals, the details pane renders as a logical child of the annotated element, so you'll have to scroll. sorry.
   */
  detailsRenderer: (this: jQuery) => string
  /**
   * indicates whether to highlight pseudo-elements or not.
   * defaults to false
   */
  pseudoEls: boolean
}

**`$.fn.clearAnnotations`**
Clears all annotation styles from the selected elements. Takes no parameters.
