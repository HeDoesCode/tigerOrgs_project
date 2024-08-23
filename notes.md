- Fix for shadcn Select component clicks bleeding through behind the component. Apply code to SelectContent:
``
    ref={(ref) => {
    if (!ref) return;
    ref.ontouchstart = (e) => e.preventDefault();
    }}
``
