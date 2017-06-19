require 'rails_helper'

RSpec.describe "Terrains", type: :request do
  describe "GET /terrains" do
    it "works! (now write some real specs)" do
      get terrains_path
      expect(response).to have_http_status(200)
    end
  end
end
