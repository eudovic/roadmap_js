# ROADMAP_JS #

### How to use ###
```javascript
<script src="dist/app.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script>
        $(document).ready(function() {
            let configs = {
                elementId: "roadmap_div",
                startOnDay: "2022-06-10",
                daysToShow: 120,
                daysOfSprint: 14,
                scroll: true,
                initialGridSizePx: 10,
                roadmapId: "roadmap_table",
                roadmapClasses: ""
            };

            let data = {
                sprints: [{
                    start: "2022-06-05",
                    name: "sprint 10",
                }, {
                    start: "2022-06-19",
                    name: "sprint 11",
                }, {
                    start: "2022-07-02",
                    name: "sprint 12",
                }],
                projects: [{
                    name: "nome_do_projeto",
                    start: "2022-06-01",
                    end: "2022-06-30",
                    color: "LightSalmon",
                    notes: [{
                        data: "2022-06-15",
                        type: "atraso",
                        message: "O projeto teve sua data de entrega adiada em cinco dias devido a ..."
                    }]
                }, {
                    name: "nome_do_projeto_2",
                    start: "2022-07-01",
                    end: "2022-07-30",
                    color: "lightYellow",
                    notes: [{
                        data: "2022-06-15",
                        type: "atraso",
                        message: "O projeto teve sua data de entrega adiada em cinco dias devido a ..."
                    }]
                }]
            }
            window.roadmap.render(configs, data);
        })
    </script>
```

![image](https://user-images.githubusercontent.com/31167386/178190428-25d79b6d-84e8-4e9f-a729-3901bbce15f0.png)

