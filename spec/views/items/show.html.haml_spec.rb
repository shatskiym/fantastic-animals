require 'rails_helper'

RSpec.describe "items/show", type: :view do
  before(:each) do
    @item = assign(:item, Item.create!(
      :weight => 2.5,
      :type => "Type",
      :name => "Name",
      :characteristic => "Characteristic"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/2.5/)
    expect(rendered).to match(/Type/)
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Characteristic/)
  end
end
