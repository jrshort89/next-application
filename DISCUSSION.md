# Hello! I'm Jake.


### Background


I'm primarily a BE developer at the moment so this was a bit outside of what I'd normally do on my day to day. Not to say I don't do FE or haven't but I'm not doing it all day everyday now.


I also did this on my Windows machine because my personal Mac is an old M1 and the screen broke so I decided to try using Windows WSL and Docker. I'm not loving it but it works.


### Approach


I wanted to fix the glaring errors first like the `<th>` without a `<tr>` and the TS errors, so the editor wasn't covered in red squiggly lines.


I messed around with the DB a little but Docker was giving me some PG auth errors and I didn't want to spend more time on that.


Todos on the BE
- implement full text search
- handle page limit changes
- I'd refactor all the logic to its own single purpose service and try and keep all endpoints free of logic and complexity


Todos on the FE
- the components could be broken down more for reusability
- similar to the BE, I would put API calls in a service and handle normalizing the response in another service
- I'm not familiar with NextJS, so I'd need to follow existing patterns in a larger app and also see what I'm missing in general to make a great NextJS app even better
- I was spending too much time on the paginator and it needs some TLC
    - implement page counts above and below the current page with click navigation


Thanks for taking the time to look at this!

Jake
