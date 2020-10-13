export default {
    name: 'RenderDom',
    functional: true,
    props: {
      render: Function
    },
    render: (h, ctx) => {
      return ctx.props.render && ctx.props.render(h)
    }
  }